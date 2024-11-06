import { Checkbox } from "@/components/ui/checkbox";
import { useFormikContext } from "formik";

interface CheckboxProps {
  id: string;
  name: string;
  checkboxValues: {
    value: string;
    label: string;
  }[];
}

export function CheckboxInput({ checkboxValues, id, name }: CheckboxProps) {
  const { setFieldValue } = useFormikContext();

  const handleOnSetCheckboxValueClick = (value: string) =>
    setFieldValue(name, value);

  return (
    <>
      {checkboxValues.map(({ value }, index) => (
        <div className="flex items-center space-x-2 mt-2" key={index}>
          <Checkbox
            id={`${id}-${index}`}
            name={name}
            onCheckedChange={() => handleOnSetCheckboxValueClick(value)}
          />
          <label
            htmlFor={`${id}-${index}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {value}
          </label>
        </div>
      ))}
    </>
  );
}
