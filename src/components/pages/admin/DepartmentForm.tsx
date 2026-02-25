import { Button, Stack, TagsInput, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

interface DepartmentFormProps {
  form: UseFormReturnType<{ name: string; areaNames: string[] }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
}

export const DepartmentForm = ({
  form,
  onSubmit,
  editing,
}: DepartmentFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <TextInput label="Name" required {...form.getInputProps("name")} />
      <TagsInput
        label="Areas"
        placeholder="Type and press Enter to add"
        {...form.getInputProps("areaNames")}
      />
      <Button type="submit">{editing ? "Update" : "Create"}</Button>
    </Stack>
  </form>
);
