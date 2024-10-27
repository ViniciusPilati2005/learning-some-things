import { Label } from "@radix-ui/react-label";
import { Field } from "formik";
import { ErrorMessage } from "../ui/error-message";
import { Input } from "@/components/ui/input";

interface InputProps {
  name: string;
  id: string;
  label: string;
  placeholder?: string;
  textLabel?: string;
  titleTab?: string;
  firstOptionTab?: string;
  lastOptionTab?: string;
  textCheckbox?: string;
  secondTextCheckbox?: string;
}

export function TextInput({
  name,
  id,
  label,
  placeholder,
  textLabel,
}: InputProps) {
  return (
    <>
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
    </>
  );
}
