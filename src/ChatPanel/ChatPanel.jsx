import MessageList from './MessageList';
import MessageForm from './MessageForm';

function ChatPanel({ messages, appendMessage }) {
    return (
        <main className="flex flex-col flex-1">
            <MessageList messages={messages} />
            <MessageForm appendMessage={appendMessage} />
        </main>
    );
}

export default ChatPanel;
