import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core";

export default function TextInput({label, placeholder}: TextInputProps) {
  return (

      <MantineTextInput
        radius="md"
        label={label}
        withAsterisk
        placeholder={placeholder}
      />

  );
}
