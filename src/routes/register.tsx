import { ButtonSubmit } from "@/components/custom/button-submit";
import { InputForm } from "@/components/custom/input-form";
import { z } from "@/utils/pt-br-zod";
import { createFileRoute } from "@tanstack/react-router";
import { Form, Formik } from "formik";
import { Loader2, SendHorizontal } from "lucide-react";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const Route = createFileRoute("/register")({
  component: RegisterInfoUser,
});

const registerSchema = z
  .object({
    name: z.string().min(5),
    age: z.preprocess((value) => Number(value), z.number().min(18)),
    city: z.string(),
    gender: z.enum(["m", "w"]),
    height: z.number().optional(),
    menstrualPeriod: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.gender === "w" && !value.menstrualPeriod) {
      ctx.addIssue({
        path: ["menstrualPeriod"],
        message: "Precisa adicionar a data do seu periodo menstrual",
        code: "custom",
      });
      ctx.addIssue({
        path: ["height"],
        message: "Precisa informar sua altura",
        code: "custom",
      });
    }
  });

const initialValues = {
  name: "",
  age: "",
  city: "",
  gender: "",
};

export function RegisterInfoUser() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
      validationSchema={toFormikValidationSchema(registerSchema)}
    >
      <Form>
        <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-gray-200">
          <InputForm
            id="name"
            name="name"
            placeholder="ex: João Raimundo"
            textLabel="Your name"
            label="name"
            type="default"
          />

          <InputForm
            id="age"
            name="age"
            placeholder="ex: 25"
            textLabel="Your age"
            label="age"
            type="default"
          />

          <InputForm
            id="height"
            name="height"
            placeholder="Optional"
            textLabel="Your height"
            label="height"
            type="default"
          />

          <InputForm
            id="city"
            name="city"
            placeholder="ex: Dois vizinhos"
            textLabel="Your city"
            label="city"
            type="default"
          />

          <InputForm
            id="gender"
            name="gender"
            label="gender"
            type="tab"
            titleTab="Your gender:"
            firstOptionTab="Man"
            lastOptionTab="Woman"
          />

          <InputForm
            id="menstrualPeriod"
            name="menstrualPeriod"
            label="menstrualPeriod"
            textLabel="Periodo Menstrual"
            type="default"
          />

          <ButtonSubmit
            textButton="Send Form"
            className="w-80 flex gap-2 mt-5"
            type="submit"
            icon={<SendHorizontal />}
            iconLoading={<Loader2 className="animate-spin" />}
          />
        </div>
      </Form>
    </Formik>
  );
}
