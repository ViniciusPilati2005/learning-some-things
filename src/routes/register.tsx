import { ButtonSubmit } from "@/components/custom/button-submit";
import { CheckboxInput } from "@/components/custom/checkbox-input";
import { TabInput } from "@/components/custom/tab-input";
import { TextInput } from "@/components/custom/text-input";
import { menstrualClicleType } from "@/constants/type-menstrual-cicle";
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
    menstrualCicle: z.enum(["regulated", "unregulated"]),
  })
  .superRefine((value, ctx) => {
    if (value.gender === "w" && !value.menstrualCicle) {
      ctx.addIssue({
        path: ["menstrualCicle"],
        message: "Precisa adicionar a informação sobre seu ciclo menstrual!",
        code: "custom",
      });
    }
  });

const initialValues = {
  name: "",
  age: "",
  city: "",
  gender: "",
  menstrualCicle: "",
};

export function RegisterInfoUser() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
      validationSchema={toFormikValidationSchema(registerSchema)}
    >
      {({ values }) => (
        <Form>
          <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-gray-200">
            <TextInput
              id="name"
              name="name"
              placeholder="ex: João Raimundo"
              textLabel="Your name"
              label="name"
            />

            <TextInput
              id="age"
              name="age"
              placeholder="ex: 25"
              textLabel="Your age"
              label="age"
            />

            <TextInput
              id="city"
              name="city"
              placeholder="ex: Dois vizinhos"
              textLabel="Your city"
              label="city"
            />

            <TabInput
              name="gender"
              titleTab="Your gender:"
              firstOptionTab="Man"
              lastOptionTab="Woman"
            />

            {values.gender === "w" && (
              <CheckboxInput
                id="menstrualCicle"
                name="menstrualCicle"
                checkboxValues={menstrualClicleType}
              />
            )}

            <ButtonSubmit
              textButton="Send Form"
              className="w-80 flex gap-2 mt-5"
              type="submit"
              icon={<SendHorizontal />}
              iconLoading={<Loader2 className="animate-spin" />}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
