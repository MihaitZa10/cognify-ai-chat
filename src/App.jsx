import { useState } from 'react';
import './App.css';
import MessageList from './ChatPanel/MessageList';
import MessageForm from './ChatPanel/MessageForm';
import Sidebar from './Sidebar/Sidebar';

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
    const [activeConversationID, setActiveConversationID] = useState(1);
    return (
        <>
            <Sidebar activeConversationID={activeConversationID} setActiveConversationID={setActiveConversationID} />
            <main className="flex flex-col flex-1">
                <MessageList messages={messages} />
                <MessageForm appendMessage={appendMessage} />
            </main>
        </>
    );
}

export default App;
