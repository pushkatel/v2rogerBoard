import {
  Button,
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
}

export const UsageLogForm = ({
  form,
  onSubmit,
  editing,
}: UsageLogFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <EquipmentSelect
          label="Equipment"
          required
          leftSection={<IconTool size={16} />}
          {...form.getInputProps("equipmentId")}
        />
        <EmployeeSelect
          multiple={false}
          label="Employee"
          required
          leftSection={<IconUser size={16} />}
          {...form.getInputProps("employeeId")}
        />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <TextInput
          label="Date"
          type="date"
          required
          leftSection={<IconCalendar size={16} />}
          {...form.getInputProps("date")}
        />
        <Select
          label="Usage Type"
          required
          data={usageTypeOptions}
          leftSection={<IconClock size={16} />}
          {...form.getInputProps("usageType")}
        />
        <NumberInput
          label="Quantity"
          required
          min={0}
          leftSection={<IconHash size={16} />}
          {...form.getInputProps("quantity")}
        />
      </SimpleGrid>
      <Textarea
        label="Notes"
        autosize
        minRows={2}
        {...form.getInputProps("notes")}
      />
      <Button type="submit" fullWidth>
        {editing ? "Update" : "Create"}
      </Button>
    </Stack>
  </form>
);
