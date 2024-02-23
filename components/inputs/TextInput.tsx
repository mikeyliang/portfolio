import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core";

export default function TextInput(props: TextInputProps) {
  return (
      <MantineTextInput radius="md" {...props} />
  );
}
