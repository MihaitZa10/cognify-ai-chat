import { useState } from 'react';
import './App.css';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

function App() {
    const initialMessages = [
        { id: 1, role: 'user', text: 'Hello, how are you?' },
        { id: 2, role: 'assistant', text: "I'm good, thank you! How can I assist you today?" },
        { id: 3, role: 'user', text: 'Can you tell me a joke?' },
    ];
    const [messages, setMessages] = useState(initialMessages);

    function appendMessage(input) {
        setMessages([...messages, { id: messages.length + 1, role: 'user', text: input }]);
    }
    return (
        <>
            <MessageList messages={messages} />
            <MessageForm appendMessage={appendMessage} />
        </>
    );
}

export default App;
