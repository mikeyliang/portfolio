import { useState } from "react";
import { DateInput as MantineDateInput, DateInputProps } from "@mantine/dates";

export default function DateInput({label, placeholder}: DateInputProps) {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <MantineDateInput
      value={value}
      onChange={setValue}
      label={label}
      placeholder={placeholder}
      radius="md"
      clearable
      defaultValue={new Date()}
      valueFormat="MM/YYYY"
      withAsterisk
    />
  );
}
