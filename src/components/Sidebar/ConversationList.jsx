import Link from 'next/link';
import Conversation from './Conversation';
import { getConversations } from '../../server/conversations';

async function ConversationList({ activeConversationID }) {
    const conversations = await getConversations();

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
