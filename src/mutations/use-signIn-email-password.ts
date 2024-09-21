import { auth } from "@/utils/firebase";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";

export interface UserData {
    email: string,
    password: string,
}
interface Result {
    onSuccess: () => void,
    onError: (error: Error) => void
}

export function useSignInEmailPasswordMutation({onSuccess, onError}: Result) {
    return useMutation({
        mutationFn: ({ email, password }: UserData) => {
                return signInWithEmailAndPassword(auth, email, password);
        },
        onSuccess,
        onError,
    })
}
