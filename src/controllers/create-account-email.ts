import { useToast } from "@/hooks/use-toast";
import { useCreateAccountEmailMutation } from "@/mutations/use-create-account";
import { useNavigate } from "@tanstack/react-router";

export function useCreateAccountEmailController () {
    const navigate = useNavigate({ from: "/" });
    const { toast } = useToast();

    const { mutate: createAccount } = useCreateAccountEmailMutation({
        onSuccess: () => {
          toast({
            duration: 2000,
            variant: "default",
            title: "Sucesso",
            description: "Conta criada com sucesso",
          });
            navigate({to: '/dashboard'})
      },
      onError: () => {
          toast({
              variant: "destructive",
              title: "Erro",
              description: "Erro ao criar conta",
            });
      }
    })
    return { createAccount }
}