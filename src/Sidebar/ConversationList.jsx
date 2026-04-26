'use client';

import Link from 'next/link';
import Conversation from './Conversation';
import { useGetConversations } from '../api/conversations';

function ConversationList({ activeConversationID }) {
    const { data: conversations = [] } = useGetConversations();

    return (
        <>
            {conversations.map((conversation) => (
                <Link href={`/chats/${conversation.id}`} key={conversation.id}>
                    <Conversation
                        title={conversation.title}
                        isActive={String(activeConversationID) === String(conversation.id)}
                    />
                </Link>
            ))}
        </>
    );
}

export default ConversationList;
