import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { z } from '@/utils/pt-br-zod'
import { Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { ErrorMessage } from '@/components/ui/error-message'
import { ButtonSubmit } from '@/components/custom/button-submit'
import { Loader2, Mail } from 'lucide-react'
import { useCreateAccountEmailController } from '@/controllers/create-account-email'

export const Route = createFileRoute('/create-account')({
  component: CreateAccount,
})

const createAccountSchemma = z
  .object({
    email: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
}

function useLogic() {
  const { createAccount } = useCreateAccountEmailController()

  return {
    createAccount,
  }
}

export function CreateAccount() {
  const { createAccount } = useLogic()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(createAccountSchemma)}
      onSubmit={createAccount}
    >
      <Form>
        <div className="w-full h-[100vh] flex justify-center items-center bg-gray-200">
          <Card className="w-full max-w-sm border border-gray-300">
            <CardHeader>
              <CardTitle className="text-2xl">Criar conta</CardTitle>
              <CardDescription>
                Crie sua conta digitando um email e senha.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <div className="flex">
                  &nbsp;
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Senha</Label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                />
                <div className="flex">
                  &nbsp;
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Confirmar Senha</Label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="confirmPassword"
                  placeholder="********"
                  required
                />
                <div className="flex">
                  &nbsp;
                  <ErrorMessage name="confirmPassword" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <ButtonSubmit
                textButton="Enviar Email"
                className="w-full flex gap-2"
                type="submit"
                icon={<Mail />}
                iconLoading={<Loader2 className="animate-spin" />}
              />
            </CardFooter>
          </Card>
        </div>
      </Form>
    </Formik>
  )
}
