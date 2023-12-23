import { Checkbox as MantineCheckbox, CheckboxProps as MantineCheckboxProps } from "@mantine/core";

type CheckboxProps = {
    label: MantineCheckboxProps["label"];
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
    
    };

export default function Checkbox(props: CheckboxProps) {
    return (
        <MantineCheckbox
            checked={props.checked}
            label={props.label}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setChecked(event.currentTarget.checked)}
        />
    );
}
