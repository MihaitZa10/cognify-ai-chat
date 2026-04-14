import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
export function useMessagesQuery(conversationId) {
    return useQuery({
        queryKey: ['messages', conversationId],
        queryFn: () => fetch(`/api/messages?conversationId=${conversationId}`).then((res) => res.json()),
        enabled: !!conversationId,
    });
}

export function useMessagesMutation(conversationId, text) {
    const body = JSON.stringify({ conversationId, text });
    const router = useRouter();
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
            router.refresh();
        },
    });
}
