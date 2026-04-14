import ChatMessage from './ChatMessage';
import { getMessages } from '../../server/messages';

async function MessageList({ conversationID }) {
    const messages = await getMessages(conversationID);

    const chatMessages = [];
    for (const message of messages) {
        chatMessages.push(<ChatMessage key={message.id} role={message.role} text={message.text} />);
    }
    return <div className="p-2 flex flex-col gap-2">{chatMessages}</div>;
}

export default MessageList;
