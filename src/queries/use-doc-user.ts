import { db } from "@/utils/firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { z } from '@/utils/pt-br-zod'

const accountSchema = z.object({
    name: z.string(),
    idade: z.number(),
    email: z.string().email()
})

type Account = z.infer<typeof accountSchema>

const ACCOUNT_REF_QUERY_KEY = (userUid: string | undefined) => ['ACCOUNT_REF_KEY', userUid]
const ACCOUNT_REF_SUBSCRIPTION_QUERY_KEY = (userUid: string | undefined) => ['ACCOUNT_SUBSCRIPTION_KEY', userUid]

export function useAccountQuery(userUid: string | undefined) {
    const queryClient = useQueryClient();

    const accountRef = doc(db, "accounts",  z.string().optional().default('undefined').parse(userUid)).withConverter({
        toFirestore: (account: Account) => account,
        fromFirestore: (snap) => accountSchema.parse(snap.data())
    });

    const result = useQuery({
        queryKey: ACCOUNT_REF_QUERY_KEY(userUid),
        queryFn: async() => {
            const accountSnap = await getDoc(accountRef);
            return accountSnap.data()
        },
        enabled: !!userUid
    })

    useQuery({
        queryKey: ACCOUNT_REF_SUBSCRIPTION_QUERY_KEY(userUid),
        queryFn: async() => {
           queryClient.getQueryData<() => void>(ACCOUNT_REF_SUBSCRIPTION_QUERY_KEY(userUid))?.()
            const unsubscribe = onSnapshot(accountRef, (accountSnap) => {
                const currentDoc = accountSnap.data()
                queryClient.setQueryData(ACCOUNT_REF_QUERY_KEY(userUid), currentDoc)
            })
            return () => {
                unsubscribe()
            }
        },
        enabled: !!userUid
    })
   
    return { result };
}