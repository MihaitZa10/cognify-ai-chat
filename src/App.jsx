import { useState } from 'react';
import './App.css';
import MessageList from './MessageList';

function App() {
    const initialMessages = [
        { id: 1, role: 'user', text: 'Hello, how are you?' },
        { id: 2, role: 'assistant', text: "I'm good, thank you! How can I assist you today?" },
        { id: 3, role: 'user', text: 'Can you tell me a joke?' },
    ];
    const [messages, setMessages] = useState(initialMessages);
    return (
        <>
            <MessageList messages={messages} />
            <button
                className="p-2 bg-gray-300 hover:bg-gray-400"
                onClick={() =>
                    setMessages([...messages, { id: messages.length + 1, role: 'user', text: 'New message' }])
                }
            >
                Add Message
            </button>
        </>
    );
}

export default App;
