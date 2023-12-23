import { DateInput as MantineDateInput, DateInputProps } from "@mantine/dates";
import React from "react";

export default function DateInput(props: DateInputProps) {
  const safeValue = props.value instanceof Date ? props.value : null;

  return (
    <MantineDateInput
      {...props}
      value={safeValue} 
      radius="md"
      clearable
      valueFormat="MM/YYYY" 
    />
  );
}
