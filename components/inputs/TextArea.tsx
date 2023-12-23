import { Textarea as MantineTextArea, TextareaProps } from "@mantine/core";

export default function TextArea(props : TextareaProps) {
  return (
    <MantineTextArea
      radius="md"
      withAsterisk
      {...props}
    />
  );
}
