import { useState, useEffect } from 'react';
import Conversation from './Conversation';
import { createConversation, getConversations } from '../api/conversations';
import AddButton from './AddButton';
function Sidebar({ activeConversationID, setActiveConversationID }) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        getConversations().then(setConversations);
    }, [conversations]);

    const conversationElements = [];
    for (const conversation of conversations) {
        conversationElements.push(
            <Conversation
                key={conversation.id}
                title={conversation.title}
                isActive={activeConversationID === conversation.id}
                setActive={() => setActiveConversationID(conversation.id)}
            />,
        );
    }

    function createNewConversation() {
        createConversation('New Conversation').then((newConversation) => {
            setActiveConversationID(newConversation.id);
        });
    }
    return (
        <aside className="flex flex-col w-64 bg-gray-900 text-white py-4 px-3">
            <div>
                <AddButton createNewConversation={createNewConversation} />
            </div>
            {conversationElements}
        </aside>
    );
}

export default Sidebar;
