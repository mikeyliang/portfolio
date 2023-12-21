import React, { useState } from "react";
import {
  MultiSelect as MantineMultiSelect,
  MultiSelectProps,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";


function MultiSelect({ data, label, placeholder }: MultiSelectProps) {
  const [value, setValue] = useState<string[]>([]);

 
  return (
 
      <MantineMultiSelect
        label={label}
        placeholder={placeholder}
        data={data}
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
