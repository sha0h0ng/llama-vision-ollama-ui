# Ollama Chat Interface

## Description

This project is a React-based chat interface that integrates with Ollama, an AI model serving system. It allows users to upload images and engage in a conversation about the image content using Ollama's vision capabilities.

## Features

- **Image upload and preview**
- **Text-based chat interface**
- **Integration with Ollama's vision model**
- **Markdown rendering for AI responses**
- **Responsive design**
- **"Enter to send" toggle functionality**
- **Auto-expanding textarea for user input**

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **Ollama** installed and running on your system

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ollama-chat-interface.git
   cd ollama-chat-interface
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

Ensure that Ollama is running on your system. By default, the application expects Ollama to be available at [http://127.0.0.1:11434](http://127.0.0.1:11434). If your Ollama instance is running on a different address, update the host in the ChatInterface.jsx file:

```javascript
const ollama = new Ollama({
  host: '[http://your-ollama-address:port](http://your-ollama-address:port)',
});
```

## Usage

1. Start the development server:
   npm start
1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
1. Upload an image using the file input on the left side of the interface
1. Type your question or prompt in the textarea at the bottom of the chat interface
1. Press Enter (if "Enter to send" is enabled) or click the Send button to submit your message
1. View the AI's response in the chat area

## Dependencies

- React
- React Bootstrap
- Ollama.js
- React Markdown
- Lucide React (for icons)
- Styled Components

## Contributing

Contributions to this project are welcome. Please ensure you follow these steps:

1. Fork the repository
2. Create a new branch: git checkout -b feature-branch-name
3. Make your changes and commit them: git commit -m 'Add some feature'
4. Push to the branch: git push origin feature-branch-name
5. Create a pull request

## License

This project is licensed under the MIT License
