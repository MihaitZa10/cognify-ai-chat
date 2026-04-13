import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useGetMessages(conversationID) {
    return useQuery({
        queryKey: ['messages', conversationID],
        queryFn: async () => {
            const res = await fetch(`/api/messages?conversationID=${conversationID}`);
            if (!res.ok) throw new Error('Failed to fetch messages');
            return res.json();
        },
        enabled: !!conversationID,
    });
}

export function useCreateMessage(conversationID, text) {
    const conversationIDNUMBER = Number.parseInt(conversationID, 10);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () =>
            fetch('/api/messages', {
                method: 'POST',
                body: JSON.stringify({ conversationID: conversationIDNUMBER, text }),
            }).then((r) => r.json()),

        onSuccess: (r) => {
            console.log(r);
            queryClient.invalidateQueries({ queryKey: ['messages', conversationID] });
        },
    });
}
