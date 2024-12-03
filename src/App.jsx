import { Container } from 'react-bootstrap';
import ChatInterface from './components/ChatInterface';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ChatInterface.css';

function App() {
  return (
    <div className='page-wrapper'>
      <Container className='app-container'>
        <ChatInterface />
      </Container>
    </div>
  );
}

export default App;
