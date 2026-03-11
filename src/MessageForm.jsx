import { useState } from 'react';
function MessageForm({ onSubmit }) {
    const [input, setInput] = useState('');
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(input);
        setInput('');
    }
    return (
        <form className="p-4 flex" onSubmit={handleSubmit}>
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    className="w-full p-2 border border-gray-300 rounded"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <div>
                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Send
                </button>
            </div>
        </form>
    );
}

export default MessageForm;
