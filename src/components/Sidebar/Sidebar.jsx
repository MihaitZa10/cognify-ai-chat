import ConversationList from './ConversationList';
import AddButton from './AddButton';

function Sidebar({ activeConversationID }) {
    return (
        <aside className="flex flex-col w-64 bg-gray-900 text-white py-4 px-3">
            <div>
                <AddButton />
            </div>
            <ConversationList activeConversationID={activeConversationID} />
        </aside>
    );
}

export default Sidebar;
