import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import ChatPanel from './ChatPanel/ChatPanel';
import { getMessages, createMessage } from './api/messages';
function App() {
    const [messages, setMessages] = useState([]);
    const [activeConversationID, setActiveConversationID] = useState(1);
    useEffect(() => {
        getMessages(activeConversationID).then(setMessages);
    }, [activeConversationID, messages]);
    function appendMessage(input) {
        createMessage(activeConversationID, 'user', input).then((newMessage) => {
            setMessages([...messages]);
        });
    }
    return (
        <>
            <Sidebar activeConversationID={activeConversationID} setActiveConversationID={setActiveConversationID} />
            <ChatPanel messages={messages} appendMessage={appendMessage} />
        </>
    );
}

export default App;
