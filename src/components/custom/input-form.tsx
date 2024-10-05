import { Label } from "@radix-ui/react-label";
import { Field, useFormikContext } from "formik";
import { ErrorMessage } from "../ui/error-message";
import { Input } from "@/components/ui/input";
import { When } from "react-if";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InputProps {
  name: string;
  id: string;
  label: string;
  placeholder?: string;
  textLabel?: string;
  type: "default" | "tab";
  titleTab?: string;
  firstOptionTab?: string;
  lastOptionTab?: string;
}

export function InputForm({
  name,
  id,
  label,
  placeholder,
  textLabel,
  type,
  titleTab,
  firstOptionTab,
  lastOptionTab,
}: InputProps) {
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <When condition={type === "default"}>
        <div className="grid gap-2 w-96">
          <Label htmlFor={label}>{textLabel}</Label>
          <Field
            id={id}
            name={name}
            placeholder={placeholder}
            as={Input}
            required
          />
          <div className="flex">
            &nbsp;
            <ErrorMessage name={name} />
          </div>
        </div>
      </When>

      <When condition={type === "tab"}>
        <Tabs
          className="w-96"
          onValueChange={(value) => setFieldValue(name, value)}
        >
          <span>{titleTab}</span>
          <TabsList className="w-full bg-gray-300">
            <TabsTrigger value="m" className="w-full">
              {firstOptionTab}
            </TabsTrigger>
            <TabsTrigger value="w" className="w-full">
              {lastOptionTab}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <ErrorMessage name={name} />
      </When>
    </>
  );
}
