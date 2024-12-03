import { useState, useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import ImageUpload from '../components/ImageUpload';
import ChatInterface from '../components/ChatInterface';

const PageContainer = styled(Row)`
  flex-grow: 1;
  overflow: hidden;
`;

const ImageColumn = styled(Col)`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const ChatColumn = styled(Col)`
  height: 100%;
  overflow-y: auto;
`;

function ChatPage() {
  const [image, setImage] = useState(null);

  const handleImageChange = useCallback((newImage) => {
    setImage(newImage);
  }, []);

  return (
    <PageContainer>
      <ImageColumn md={4}>
        <ImageUpload image={image} onImageChange={handleImageChange} />
      </ImageColumn>
      <ChatColumn md={8}>
        <ChatInterface image={image} onImageChange={handleImageChange} />
      </ChatColumn>
    </PageContainer>
  );
}

export default ChatPage;
