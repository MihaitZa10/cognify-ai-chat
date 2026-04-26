'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ConversationList from './ConversationList';
import { createConversation, getConversations } from '../api/conversations';
import AddButton from './AddButton';

function Sidebar({ activeConversationID }) {
    const [conversations, setConversations] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getConversations().then(setConversations);
    }, []);

    async function createNewConversation() {
        try {
            const newConversation = await createConversation('New Conversation');
            router.push(`/chats/${newConversation.id}`);
            const updatedConversations = await getConversations();
            setConversations(updatedConversations);
        } catch (error) {
            console.error('Failed to create conversation:', error);
        }
    }

    return (
        <aside className="flex flex-col w-64 bg-gray-900 text-white py-4 px-3">
            <AddButton createNewConversation={createNewConversation} />
            <ConversationList conversations={conversations} activeConversationID={activeConversationID} />
        </aside>
    );
}

export default Sidebar;
