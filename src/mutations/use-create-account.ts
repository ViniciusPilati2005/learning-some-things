import { auth, db } from "@/utils/firebase";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface MutationAction {
    onSuccess: () => void
    onError: () => void
}
export interface CreateAccountActions {
    email: string
    password: string
}

export function useCreateAccountEmailMutation({onSuccess, onError}: MutationAction) {
    return useMutation({
        mutationFn: async({email, password}: CreateAccountActions) => {
            await createUserWithEmailAndPassword(auth, email, password).then(() => {
                const user = auth.currentUser
                setDoc(doc(db, 'users', user?.uid), {
                    name: user?.displayName,
                    email: user?.email,
                    idade: 19
                })
            }).catch((error) => {
                console.log(error)
            })
        },
        onSuccess,
        onError
    })
}