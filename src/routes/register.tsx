import { ErrorMessage } from "@/components/ui/error-message";
import { Label } from "@radix-ui/react-label";
import { createFileRoute } from "@tanstack/react-router";
import { Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "@/utils/pt-br-zod";
import { ButtonSubmit } from "@/components/custom/button-submit";
import { Loader2, SendHorizontal } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterInfoUser,
});

const registerSchema = z.object({
  name: z.string(),
  age: z.number().min(18),
  city: z.string(),
});

const initialValues = {
  name: "",
  age: "",
  city: "",
};

export function RegisterInfoUser() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={toFormikValidationSchema(registerSchema)}
    >
      <Form>
        <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-gray-200">
          <div className="grid gap-2 w-96">
            <Label htmlFor="name">Your name</Label>
            <Field
              id="name"
              name="name"
              type="name"
              placeholder="ex: João Raimundo"
              required
            />
            <div className="flex">
              &nbsp;
              <ErrorMessage name="name" />
            </div>
          </div>

          <div className="grid gap-2 w-96">
            <Label htmlFor="age">Your age</Label>
            <Field
              id="age"
              name="age"
              type="age"
              placeholder="Ex: 25"
              required
            />
            <div className="flex">
              &nbsp;
              <ErrorMessage name="age" />
            </div>
          </div>
          <ButtonSubmit
            textButton="Enviar Formulário"
            className="w-80 flex gap-2"
            type="submit"
            icon={<SendHorizontal />}
            iconLoading={<Loader2 className="animate-spin" />}
          />
        </div>
      </Form>
    </Formik>
  );
}

// cadastrar informações
// formulário condicional, se coloca campo x, aparece n campos
// se coloca campo y, aparece outros n campos
// muda validaçã odependendo do campo
// usar formik, campos opcionais
// pegar valor e decide se muda/valida o campo
// ver sobre superRefine que valida mais de um campo por vez
// conforme as opções, muda o que pede
