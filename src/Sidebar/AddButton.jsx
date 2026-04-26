'use client';

import { useCreateConversation } from '../api/conversations';

function AddConversationButton() {
    const mutation = useCreateConversation('New Conversation');

    return (
        <button
            className="w-full bg-red-500 hover:bg-red-600 py-2 my-2"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
        >
            {mutation.isPending ? 'Loading...' : '+ New Chat'}
        </button>
    );
}

export default AddConversationButton;
