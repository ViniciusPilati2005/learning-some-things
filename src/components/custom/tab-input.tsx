import { ErrorMessage } from "@/components/ui/error-message";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormikContext } from "formik";

interface TabProps {
  name: string;
  titleTab?: string;
  firstOptionTab?: string;
  lastOptionTab?: string;
}

export function TabInput({
  titleTab,
  firstOptionTab,
  lastOptionTab,
  name,
}: TabProps) {
  const { setFieldValue } = useFormikContext();
  return (
    <div>
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
    </div>
  );
}
