function AddConversationButton({ createNewConversation }) {
    return (
        <button className="w-full bg-red-500 hover:bg-red-600 py-2 my-2" onClick={createNewConversation}>
            New chat
        </button>
    );
}

export default AddConversationButton;
