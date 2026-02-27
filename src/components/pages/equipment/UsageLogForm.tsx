import {
  Button,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import {
  IconCalendar,
  IconClock,
  IconHash,
  IconTool,
  IconUser,
} from "@tabler/icons-react";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import { EquipmentSelect } from "@/components/shared/form-fields/EquipmentSelect";
import type { UsageType } from "@/types";

const usageTypeOptions: { value: UsageType; label: string }[] = [
  { value: "hours", label: "Hours" },
  { value: "cycles", label: "Cycles" },
  { value: "units", label: "Units" },
];

interface UsageLogFormProps {
  form: UseFormReturnType<{
    equipmentId: string;
    employeeId: string;
    date: string;
    usageType: UsageType;
    quantity: number;
    notes: string;
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
  readOnly?: boolean;
  onCancel?: () => void;
}

export const UsageLogForm = ({
  form,
  onSubmit,
  editing,
  readOnly,
  onCancel,
}: UsageLogFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <EquipmentSelect
          label="Equipment"
          required
          disabled={readOnly}
          leftSection={<IconTool size={16} />}
          {...form.getInputProps("equipmentId")}
        />
        <EmployeeSelect
          multiple={false}
          label="Employee"
          required
          disabled={readOnly}
          leftSection={<IconUser size={16} />}
          {...form.getInputProps("employeeId")}
        />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <TextInput
          label="Date"
          type="date"
          required
          readOnly={readOnly}
          leftSection={<IconCalendar size={16} />}
          {...form.getInputProps("date")}
        />
        <Select
          label="Usage Type"
          required
          data={usageTypeOptions}
          disabled={readOnly}
          leftSection={<IconClock size={16} />}
          {...form.getInputProps("usageType")}
        />
        <NumberInput
          label="Quantity"
          required
          min={0}
          readOnly={readOnly}
          leftSection={<IconHash size={16} />}
          {...form.getInputProps("quantity")}
        />
      </SimpleGrid>
      <Textarea
        label="Notes"
        autosize
        minRows={2}
        readOnly={readOnly}
        {...form.getInputProps("notes")}
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
          <Button type="submit" fullWidth>
            {editing ? "Update" : "Create"}
          </Button>
        ))}
    </Stack>
  </form>
);
