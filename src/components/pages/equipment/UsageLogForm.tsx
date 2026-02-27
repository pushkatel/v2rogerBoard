import { Button, NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
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
      <EquipmentSelect
        label="Equipment"
        required
        {...form.getInputProps("equipmentId")}
      />
      <EmployeeSelect
        multiple={false}
        label="Employee"
        required
        {...form.getInputProps("employeeId")}
      />
      <TextInput
        label="Date"
        type="date"
        required
        {...form.getInputProps("date")}
      />
      <Select
        label="Usage Type"
        required
        data={usageTypeOptions}
        {...form.getInputProps("usageType")}
      />
      <NumberInput
        label="Quantity"
        required
        min={0}
        {...form.getInputProps("quantity")}
      />
      <Textarea
        label="Notes"
        autosize
        minRows={2}
        {...form.getInputProps("notes")}
      />
      <Button type="submit">{editing ? "Update" : "Create"}</Button>
    </Stack>
  </form>
);
