import {
  MultiSelect as MantineMultiSelect,
  MultiSelectProps,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";


function MultiSelect(props: MultiSelectProps) {
  return (
 
      <MantineMultiSelect
        {...props}
        searchable
        nothingFoundMessage="Nothing found..."
        comboboxProps={{
          transitionProps: { transition: "pop", duration: 200 },
        }}
        styles={{
          pill: {
            borderRadius: "6px",
          },
        }}
        radius="md"
        withAsterisk
      />
  );
}

export default MultiSelect;
