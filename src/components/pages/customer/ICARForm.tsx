import {
  Button,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import { useAppContext } from "@/data/AppContext";
import type { Priority, TicketStatus } from "@/types";
import { priorityOptions, statusOptions } from "@/utils";

interface ICARFormProps {
  form: UseFormReturnType<{
    customer: string;
    openDate: string;
    jobNumber: string;
    releaseNumber: string;
    panelsAffected: number;
    departmentId: string;
    problemTitle: string;
    problemDescription: string;
    whereOccurred: string;
    rootCause: string;
    containmentAction: string;
    status: TicketStatus;
    priority: Priority;
    assignedEmployeeIds: string[];
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
}

export const ICARForm = ({ form, onSubmit, editing }: ICARFormProps) => {
  const { departments } = useAppContext();

  const departmentOptions = departments.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  return (
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
        <TextInput
          label="Job Number"
          required
          {...form.getInputProps("jobNumber")}
        />
        <TextInput
          label="Release Number"
          required
          {...form.getInputProps("releaseNumber")}
        />
        <NumberInput
          label="Panels Affected"
          required
          min={0}
          {...form.getInputProps("panelsAffected")}
        />
        <Select
          label="Department"
          data={departmentOptions}
          {...form.getInputProps("departmentId")}
        />
        <TextInput
          label="Problem Title"
          required
          {...form.getInputProps("problemTitle")}
        />
        <Textarea
          label="Problem Description"
          autosize
          minRows={3}
          {...form.getInputProps("problemDescription")}
        />
        <Textarea
          label="Where Occurred"
          autosize
          minRows={3}
          {...form.getInputProps("whereOccurred")}
        />
        <Textarea
          label="Root Cause"
          autosize
          minRows={3}
          {...form.getInputProps("rootCause")}
        />
        <Textarea
          label="Containment Action"
          autosize
          minRows={3}
          {...form.getInputProps("containmentAction")}
        />
        <EmployeeSelect {...form.getInputProps("assignedEmployeeIds")} />
        <Button type="submit">{editing ? "Update" : "Create"}</Button>
      </Stack>
    </form>
  );
};
