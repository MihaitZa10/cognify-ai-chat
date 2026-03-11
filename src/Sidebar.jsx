import { useState } from 'react';

function Sidebar({ activeConversationID, setActiveConversationID }) {
    const initialConversations = [
        { id: 1, title: 'How is your day?' },
        { id: 2, title: 'Help me with homework' },
    ];
    const [conversations, setConversations] = useState(initialConversations);
    const conversationElements = [];
    for (const conversation of conversations) {
        conversationElements.push(
            <div
                key={conversation.id}
                className={`block rounded-lg p-2 my-1 ${activeConversationID === conversation.id ? 'bg-gray-700' : 'bg-gray-500'}`}
                onClick={() => setActiveConversationID(conversation.id)}
            >
                {conversation.title}
            </div>,
        );
    }

    function createNewConversation() {
        const newConversation = { id: conversations.length + 1, title: 'New Conversation' };
        setConversations([...conversations, newConversation]);
        setActiveConversationID(newConversation.id);
    }
    return (
        <aside className="flex flex-col w-64 bg-gray-900 text-white py-4 px-3">
            <div>
                <button className="w-full bg-red-500 hover:bg-red-600 py-2 my-2" onClick={createNewConversation}>
                    New chat
                </button>
            </div>
            {conversationElements}
        </aside>
    );
}

export default Sidebar;
