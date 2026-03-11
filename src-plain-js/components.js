class ChatMessage extends HTMLElement {
    connectedCallback() {
        const role = this.getAttribute('role');

        this.classList.add('p-2', 'flex');

        if (role === 'user') {
            this.classList.add('justify-start', 'bg-gray-200');
        } else {
            this.classList.add('justify-end', 'bg-blue-200');
        }
    }
}

customElements.define('chat-message', ChatMessage);
