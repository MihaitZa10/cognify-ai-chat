import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
export function useConversationQuery() {
    return useQuery({
        queryKey: ['conversations'],
        queryFn: () => fetch('/api/conversations').then((res) => res.json()),
    });
}

export function useConversationMutation(title) {
    const router = useRouter();
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
                router.push(`/chats/${r.id}`);
            });
        },
    });
}
