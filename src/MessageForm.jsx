import { useState, useEffect, use } from 'react';
function MessageForm({ appendMessage }) {
    const [input, setInput] = useState('');
    const [counter, setCounter] = useState(0);
    function onSubmit(event) {
        event.preventDefault();
        appendMessage(input);
        setInput('');
        setCounter(counter + 1);
    }
    useEffect(() => {
        console.log(`Form submitted ${counter} times`);
    }, [counter]);
    return (
        <form className="p-4 flex" onSubmit={onSubmit}>
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
