import { Button, Select, Stack, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import type { ECNStatus, Priority } from "@/types";
import { priorityOptions } from "@/utils";

interface ECNFormProps {
  form: UseFormReturnType<{
    customer: string;
    openDate: string;
    releaseNumber: string;
    jobNumber: string;
    status: ECNStatus;
    priority: Priority;
    assignedEmployeeIds: string[];
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
}

export const ECNForm = ({ form, onSubmit, editing }: ECNFormProps) => (
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
        data={priorityOptions}
        {...form.getInputProps("priority")}
      />
      <EmployeeSelect {...form.getInputProps("assignedEmployeeIds")} />
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
