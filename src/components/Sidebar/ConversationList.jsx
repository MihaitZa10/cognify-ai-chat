'use client';
import Link from 'next/link';
import Conversation from './Conversation';
import { useConversationQuery } from '../../hooks/conversations';

function ConversationList({ activeConversationID }) {
    const response = useConversationQuery();
    const conversations = response.data ?? [];
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
