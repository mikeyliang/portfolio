import { Textarea as MantineTextArea, TextareaProps } from "@mantine/core";

export default function TextArea({label, placeholder} : TextareaProps) {
  return (
    <MantineTextArea
      radius="md"
      label={label}
      withAsterisk
      placeholder={placeholder}
    />
  );
}
