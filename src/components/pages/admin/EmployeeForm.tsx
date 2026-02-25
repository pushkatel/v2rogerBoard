import { Button, Select, Stack, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

interface EmployeeFormProps {
  form: UseFormReturnType<{
    name: string;
    role: string;
    departmentId: string;
    email: string;
    phone: string;
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
  deptOptions: { value: string; label: string }[];
}

export const EmployeeForm = ({
  form,
  onSubmit,
  editing,
  deptOptions,
}: EmployeeFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <TextInput label="Name" required {...form.getInputProps("name")} />
      <TextInput label="Role" required {...form.getInputProps("role")} />
      <Select
        label="Department"
        required
        data={deptOptions}
        {...form.getInputProps("departmentId")}
      />
      <TextInput
        label="Email"
        required
        {...form.getInputProps("email")}
      />
      <TextInput label="Phone" required {...form.getInputProps("phone")} />
      <Button type="submit">{editing ? "Update" : "Create"}</Button>
    </Stack>
  </form>
);
