'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const queryKey = ['conversations'];

export function useConversationQuery() {
    return useQuery({
        queryKey,
        queryFn: () => fetch('/api/conversations').then((res) => res.json()),
    });
}

export function useConversationMutation(title) {
    const router = useRouter();
    const body = JSON.stringify({ title });
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => fetch('/api/conversations', { method: 'POST', body }).then((r) => r.json()),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            const previous = queryClient.getQueryData(queryKey);
            const newConversation = { id: 'temp', title };
            queryClient.setQueryData(queryKey, (old) => (old ? [newConversation, ...old] : [newConversation]));
            return { previous };
        },
        onSuccess: async (r) => {
            await queryClient.invalidateQueries({ queryKey });
            router.push(`/chats/${r.id}`);
        },
        onError: (_err, context) => {
            queryClient.setQueryData(queryKey, context?.previous);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey });
        },
    });
}
