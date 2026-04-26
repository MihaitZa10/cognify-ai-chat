'use client';

import { useState } from 'react';
import { useCreateMessage } from '../api/messages';
function MessageForm({ conversationID, isLoading }) {
    const [input, setInput] = useState('');
    const [counter, setCounter] = useState(0);

    const mutation = useCreateMessage(conversationID, input);

    function onSubmit(event) {
        event.preventDefault();
        if (isLoading) return;
        mutation.mutate();
        setInput('');
        setCounter(counter + 1);
        console.log(`Form submitted ${counter} times`);
    }

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
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="ml-2 p-2 bg-pink-500 text-white rounded hover:bg-purple-600"
                >
                    {mutation.isPending ? 'Loading...' : 'Send'}
                </button>
            </div>
        </form>
    );
}

export default MessageForm;
