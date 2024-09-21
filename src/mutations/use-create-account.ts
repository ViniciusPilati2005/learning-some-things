import { auth } from "@/utils/firebase";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
        mutationFn: ({email, password}: CreateAccountActions) => {
            return createUserWithEmailAndPassword(auth, email, password);
        },
        onSuccess,
        onError
    })
}