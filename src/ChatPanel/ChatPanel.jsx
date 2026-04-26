import MessageList from './MessageList';
import MessageForm from './MessageForm';

function ChatPanel({ messages, appendMessage, isLoading }) {
    return (
        <main className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <MessageList messages={messages} />
                {isLoading && (
                    <div className="p-4 text-gray-400 italic flex items-center gap-2">
                        <div className="animate-bounce">●</div>
                        <div className="animate-bounce [animation-delay:0.2s]">●</div>
                        <div className="animate-bounce [animation-delay:0.4s]">●</div>
                        <span>Gemma is thinking...</span>
                    </div>
                )}
            </div>
            <MessageForm appendMessage={appendMessage} isLoading={isLoading} />
        </main>
    );
}

export default ChatPanel;
