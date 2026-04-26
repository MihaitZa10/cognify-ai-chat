import { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import { createConversation, getConversations } from '../api/conversations';
import AddButton from './AddButton';
function Sidebar({ activeConversationID, setActiveConversationID }) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        getConversations().then(setConversations);
    }, [conversations]);

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
            <ConversationList
                conversations={conversations}
                activeConversationID={activeConversationID}
                setActiveConversationID={setActiveConversationID}
            />
        </aside>
    );
}

export default Sidebar;
