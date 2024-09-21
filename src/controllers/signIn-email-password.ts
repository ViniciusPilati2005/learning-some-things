import { useToast } from "@/hooks/use-toast";
import { useSignInEmailPasswordMutation } from "@/mutations/use-signIn-email-password";
import { useNavigate } from "@tanstack/react-router";
import { FirebaseError } from "firebase/app";

export function useSignInEmailPasswordController() {
    const navigate = useNavigate({ from: "/" });
    const { toast } = useToast();

    const { mutate: signInWithEmailPassword } = useSignInEmailPasswordMutation({
        onSuccess: () => {
            navigate({ to: "/dashboard" });
          },
          onError: (error) => {
            if (error instanceof FirebaseError) {
              switch (error.code) {
                case "auth/invalid-email":
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Este email não é valido.",
                  });
                  break;
                case "auth/user-disabled":
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Este usuário foi desativado.",
                  });
                  break;
                case "auth/user-not-found":
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Este usuário não foi encontrado.",
                  });
                  break;
                case "auth/wrong-password":
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Senha inválida ou indefinida.",
                  });
                  break;
      
                default:
                  toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: "Não foi possivel realizar a operação.",
                  });
                  break;
              }
              return;
            }
            toast({
              variant: "destructive",
              title: "Erro!",
              description: "Não foi possivel realizar a operação.",
            });
          },
    });

      return { signInWithEmailPassword };
  }


