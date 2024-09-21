import { createFileRoute, Link } from "@tanstack/react-router";
import { Label } from "@/components/ui/label";
import { useSignInEmailPasswordController } from "@/controllers/signIn-email-password";
import { z } from "@/utils/pt-br-zod";
import { Form, Formik } from "formik";
import { LogInIcon } from "lucide-react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ErrorMessage } from "@/components/ui/error-message";
import { Field } from "@/components/ui/field";
import { ButtonSubmit } from "@/components/custom/button-submit";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

const User = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function useLogic() {
  const { signInWithEmailPassword } = useSignInEmailPasswordController();

  const initialValues = {
    email: "",
    password: "",
  };

  return {
    signInWithEmailPassword,
    initialValues,
  };
}

export function LoginPage() {
  const { signInWithEmailPassword, initialValues } = useLogic();

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <div className="flex items-center justify-center max-h-72 select-none">
        <div className="flex flex-col justify-center border rounded-lg w-full min-w-96 max-w-md p-6 bg-white">
          <div className="flex items-start justify-center space-x-2">
            <LogInIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            Faça seu login.
          </h2>
          <Formik
            validationSchema={toFormikValidationSchema(User)}
            initialValues={initialValues}
            onSubmit={signInWithEmailPassword}
          >
            <Form className="space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  placeholder="user@email.com"
                  className="w-full mt-1"
                />
                <p className="flex">
                  &nbsp;
                  <ErrorMessage name="email" />
                </p>
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </Label>
                <Field
                  name="password"
                  id="password"
                  type="password"
                  placeholder="******"
                  className="w-full mt-1"
                />
                <p className="flex">
                  &nbsp;
                  <ErrorMessage name="password" />
                </p>
              </div>
              <ButtonSubmit
                textButton="Continuar"
                type="submit"
                className="w-full bg-blue-600 text-white"
              />
            </Form>
          </Formik>
          <div className="text-center text-gray-600 flex gap-1">
            Não possui uma conta?
            <Link to="/create-account" className="text-blue-600">
              Clique aqui para cadastrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
