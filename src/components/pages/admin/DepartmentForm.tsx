import { Button, Group, Stack, TagsInput, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

interface DepartmentFormProps {
  form: UseFormReturnType<{ name: string; areaNames: string[] }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
  readOnly?: boolean;
  onCancel?: () => void;
}

export const DepartmentForm = ({
  form,
  onSubmit,
  editing,
  readOnly,
  onCancel,
}: DepartmentFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <TextInput
        label="Name"
        required
        readOnly={readOnly}
        {...form.getInputProps("name")}
      />
      <TagsInput
        label="Areas"
        placeholder="Type and press Enter to add"
        readOnly={readOnly}
        {...form.getInputProps("areaNames")}
      />
      {!readOnly &&
        (onCancel ? (
          <Group justify="flex-end">
            <Button variant="subtle" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Update" : "Create"}</Button>
          </Group>
        ) : (
          <Button type="submit">{editing ? "Update" : "Create"}</Button>
        ))}
    </Stack>
  </form>
);
