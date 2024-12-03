import { useState, useCallback, useTransition, useRef, useEffect } from 'react';
import { Form, Button, Image, Alert, Spinner } from 'react-bootstrap';
import { Ollama } from 'ollama';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ollama = new Ollama({
  host: 'http://127.0.0.1:11434',
});

function ChatInterface() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [image, setImage] = useState(null);
  const [enterToSend, setEnterToSend] = useState(true);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromptChange = useCallback((e) => {
    setPrompt(e.target.value);
  }, []);

  const handleEnterToSendChange = (e) => {
    setEnterToSend(e.target.checked);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && enterToSend) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!prompt && !image) return;

      const newMessage = { role: 'user', content: prompt, image: image };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setError(null);
      setIsWaitingForResponse(true);

      startTransition(async () => {
        try {
          const response = await ollama.chat({
            model: 'llama3.2-vision',
            messages: [
              {
                role: 'user',
                content: prompt || 'What is in this image?',
                images: image ? [image.split(',')[1]] : undefined,
              },
            ],
          });

          if (response && response.message) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { role: 'assistant', content: response.message.content },
            ]);
          } else {
            throw new Error('Unexpected response format from Ollama');
          }
        } catch (error) {
          console.error('Error:', error);
          setError(
            `Error: ${error.message}. Please check if Ollama is running and the correct model is available.`
          );
        } finally {
          setIsWaitingForResponse(false);
          setPrompt('');
          setImage(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      });
    },
    [prompt, image]
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  return (
    <div className='main-container'>
      <div className='image-section'>
        {image ? (
          <Image src={image} alt='Preview' fluid className='preview-image' />
        ) : (
          <div className='upload-placeholder'>
            Drop an image here or click to upload
          </div>
        )}
        <Form.Group controlId='formFile' className='mt-3'>
          <Form.Control
            type='file'
            onChange={handleImageChange}
            accept='.jpg,.jpeg,.png'
            ref={fileInputRef}
          />
        </Form.Group>
      </div>

      <div className='right-section'>
        {error && <Alert variant='danger'>{error}</Alert>}

        <div className='chat-section'>
          {messages.map((msg, index) => (
            <div key={index} className={`message-container ${msg.role}`}>
              <div className={`icon-wrapper ${msg.role}`}>
                {msg.role === 'user' ? <User size={24} /> : <Bot size={24} />}
              </div>
              <div className={`message-bubble ${msg.role}-bubble`}>
                {msg.role === 'user' ? (
                  <>
                    {msg.image && (
                      <Image
                        src={msg.image}
                        alt='User uploaded'
                        fluid
                        className='mt-2'
                        style={{ maxWidth: '200px' }}
                      />
                    )}
                    <br />
                    {msg.content}
                  </>
                ) : (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='input-section'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='prompt'>
              <Form.Control
                as='textarea'
                rows={1}
                value={prompt}
                onChange={handlePromptChange}
                onKeyDown={handleKeyDown}
                placeholder='Ask about the image...'
                disabled={isWaitingForResponse}
                ref={textareaRef}
              />
            </Form.Group>
            <div className='d-flex justify-content-between align-items-center'>
              <Form.Check
                type='checkbox'
                id='enter-to-send'
                label='Press Enter to send'
                checked={enterToSend}
                onChange={handleEnterToSendChange}
              />
              <Button
                variant='primary'
                type='submit'
                disabled={
                  isPending || (!prompt && !image) || isWaitingForResponse
                }
              >
                {isWaitingForResponse ? (
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                ) : (
                  'Send'
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
