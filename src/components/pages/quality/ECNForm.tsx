import { Button, Checkbox, Group, MultiSelect, Select, Stack, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

import type { ECNPriority, ECNStatus } from "@/types";

interface ECNFormProps {
  form: UseFormReturnType<{
    customer: string;
    openDate: string;
    releaseNumber: string;
    jobNumber: string;
    status: ECNStatus;
    priority: ECNPriority;
    assignedEmployeeIds: string[];
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
  employeeOptions: { value: string; label: string }[];
}

export const ECNForm = ({
  form,
  onSubmit,
  editing,
  employeeOptions,
}: ECNFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <TextInput
        label="Customer"
        required
        {...form.getInputProps("customer")}
      />
      <TextInput
        label="Open Date"
        type="date"
        required
        {...form.getInputProps("openDate")}
      />
      <TextInput
        label="Release Number"
        required
        {...form.getInputProps("releaseNumber")}
      />
      <TextInput
        label="Job Number"
        required
        {...form.getInputProps("jobNumber")}
      />
      <Select
        label="Status"
        required
        data={ecnStatusOptions}
        {...form.getInputProps("status")}
      />
      <Select
        label="Priority"
        required
        data={ecnPriorityOptions}
        {...form.getInputProps("priority")}
      />
      <MultiSelect
        label="Assigned Employees"
        data={employeeOptions}
        searchable
        renderOption={({ option, checked }) => (
          <Group gap="sm">
            <Checkbox checked={checked} onChange={() => {}} tabIndex={-1} readOnly />
            {option.label}
          </Group>
        )}
        {...form.getInputProps("assignedEmployeeIds")}
      />
      <Button type="submit">{editing ? "Update" : "Create"}</Button>
    </Stack>
  </form>
);

const ecnStatusOptions: { value: ECNStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "open", label: "Open" },
  { value: "in-review", label: "In Review" },
  { value: "approved", label: "Approved" },
  { value: "closed", label: "Closed" },
];

const ecnPriorityOptions: { value: ECNPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];
