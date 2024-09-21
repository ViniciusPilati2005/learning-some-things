import { auth } from "@/utils/firebase"
import { useQuery } from "@tanstack/react-query"

export const QUERY_KEY_CURRENT_USER = ['currentUser']

export function useCurrentUserQuery() {
    return useQuery({
        initialData: {user: auth.currentUser},
        queryKey: QUERY_KEY_CURRENT_USER,
        queryFn: async () => {
            await auth.authStateReady()

            return {user: auth.currentUser};
        },
    })
}