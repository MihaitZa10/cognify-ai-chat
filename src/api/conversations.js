'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useGetConversations() {
    return useQuery({
        queryKey: ['conversations'],
        queryFn: () => fetch('/api/conversations').then((res) => res.json()),
    });
}

export function useCreateConversation(title) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () =>
            fetch('/api/conversations', {
                method: 'POST',
                body: JSON.stringify({ title }),
            }).then((r) => r.json()),

        onSuccess: (r) => {
            console.log(r);
            queryClient.invalidateQueries({ queryKey: ['conversations'] }).then(() => {
                window.location.href = `/chats/${r.id}`;
            });
        },
    });
}
