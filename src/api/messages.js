import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useGetMessages(conversationId) {
    return useQuery({
        queryKey: ['messages', conversationId],
        queryFn: () => fetch(`/api/messages?conversationId=${conversationId}`).then((res) => res.json()),
        enabled: !!conversationId,
    });
}

export function useCreateMessage(conversationId, text) {
    const body = JSON.stringify({ conversationId, text });

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () =>
            fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }).then((r) => r.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
        },
    });
}
