import {
  Button,
  Group,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
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
  readOnly?: boolean;
  onCancel?: () => void;
}

export const EmployeeForm = ({
  form,
  onSubmit,
  editing,
  deptOptions,
  readOnly,
  onCancel,
}: EmployeeFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput
          label="Name"
          required
          readOnly={readOnly}
          leftSection={<IconUser size={16} />}
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Role"
          required
          readOnly={readOnly}
          leftSection={<IconBriefcase size={16} />}
          {...form.getInputProps("role")}
        />
      </SimpleGrid>
      <Select
        label="Department"
        required
        data={deptOptions}
        disabled={readOnly}
        leftSection={<IconBuilding size={16} />}
        {...form.getInputProps("departmentId")}
      />
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput
          label="Email"
          required
          readOnly={readOnly}
          leftSection={<IconAt size={16} />}
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Phone"
          required
          readOnly={readOnly}
          leftSection={<IconPhone size={16} />}
          {...form.getInputProps("phone")}
        />
      </SimpleGrid>
      {!readOnly &&
        (onCancel ? (
          <Group justify="flex-end">
            <Button variant="subtle" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Update" : "Create"}</Button>
          </Group>
        ) : (
          <Button type="submit" fullWidth>
            {editing ? "Update" : "Create"}
          </Button>
        ))}
    </Stack>
  </form>
);
