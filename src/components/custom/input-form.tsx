import { Label } from "@radix-ui/react-label";
import { Field, useFormikContext } from "formik";
import { ErrorMessage } from "../ui/error-message";
import { Input } from "@/components/ui/input";
import { If, Then, When } from "react-if";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

interface InputProps {
  name: string;
  id: string;
  label: string;
  placeholder?: string;
  textLabel?: string;
  type: "default" | "tab" | "checkbox";
  titleTab?: string;
  firstOptionTab?: string;
  lastOptionTab?: string;
  textCheckbox?: string;
  secondTextCheckbox?: string;
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
  textCheckbox,
  secondTextCheckbox,
}: InputProps) {
  const { setFieldValue, errors, values } = useFormikContext();

  console.log(errors);

  console.log(values);
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

      <When condition={type === "checkbox"}>
        <div className="flex flex-col gap-3 mt-3">
          {textLabel}
          <div className="flex items-center space-x-2">
            <Field
              as={Checkbox}
              id={id}
              name={name}
            />
            <label
              htmlFor={label}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {textCheckbox}
            </label>
          </div>

          <If condition={secondTextCheckbox}>
            <Then>
              <div className="flex items-center space-x-2">
                <Checkbox id={id} />
                <label
                  htmlFor={label}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {secondTextCheckbox}
                </label>
              </div>
              <ErrorMessage name={name} />
            </Then>
          </If>
        </div>
      </When>
    </>
  );
}
