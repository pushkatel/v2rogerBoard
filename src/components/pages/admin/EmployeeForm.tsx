import { Button, Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import {
  IconAt,
  IconBriefcase,
  IconBuilding,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
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
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput
          label="Name"
          required
          leftSection={<IconUser size={16} />}
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Role"
          required
          leftSection={<IconBriefcase size={16} />}
          {...form.getInputProps("role")}
        />
      </SimpleGrid>
      <Select
        label="Department"
        required
        data={deptOptions}
        leftSection={<IconBuilding size={16} />}
        {...form.getInputProps("departmentId")}
      />
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput
          label="Email"
          required
          leftSection={<IconAt size={16} />}
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Phone"
          required
          leftSection={<IconPhone size={16} />}
          {...form.getInputProps("phone")}
        />
      </SimpleGrid>
      <Button type="submit" fullWidth>
        {editing ? "Update" : "Create"}
      </Button>
    </Stack>
  </form>
);
