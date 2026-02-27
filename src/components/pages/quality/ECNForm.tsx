import { Button, Select, Stack, Textarea, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import type { Priority, TicketStatus } from "@/types";
import { priorityOptions, statusOptions } from "@/utils";

interface ECNFormProps {
  form: UseFormReturnType<{
    customer: string;
    openDate: string;
    releaseNumber: string;
    jobNumber: string;
    status: TicketStatus;
    priority: Priority;
    reason: string;
    correctiveChanges: string;
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
        data={statusOptions}
        {...form.getInputProps("status")}
      />
      <Select
        label="Priority"
        required
        data={priorityOptions}
        {...form.getInputProps("priority")}
      />
      <Textarea
        label="ECN Reason"
        autosize
        minRows={3}
        {...form.getInputProps("reason")}
      />
      <Textarea
        label="Corrective Changes"
        autosize
        minRows={3}
        {...form.getInputProps("correctiveChanges")}
      />
      <EmployeeSelect {...form.getInputProps("assignedEmployeeIds")} />
      <Button type="submit">{editing ? "Update" : "Create"}</Button>
    </Stack>
  </form>
);
