'use client';
import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import ChatPanel from './ChatPanel/ChatPanel';
import { getMessages, createMessage } from './api/messages';
function App() {
    const [messages, setMessages] = useState([]);
    const [activeConversationID, setActiveConversationID] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getMessages(activeConversationID).then(setMessages);
    }, [activeConversationID]);
    async function appendMessage(input) {
        if (!input.trim()) return;
        setIsLoading(true);

        try {
            await createMessage(activeConversationID, input);
            const updatedMessages = await getMessages(activeConversationID);
            setMessages([...updatedMessages]);
        } catch (error) {
            console.error('Failed to get AI response:', error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Sidebar activeConversationID={activeConversationID} setActiveConversationID={setActiveConversationID} />
            <ChatPanel messages={messages} appendMessage={appendMessage} isLoading={isLoading} />
        </>
    );
}

export default App;
