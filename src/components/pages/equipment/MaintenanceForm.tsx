import { Button, Select, Stack, Textarea, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import type { MaintenanceCategory, Priority, TicketStatus } from "@/types";
import { maintenanceCategoryOptions, priorityOptions, statusOptions } from "@/utils";

interface MaintenanceFormProps {
  form: UseFormReturnType<{
    equipmentId: string;
    reportedBy: string;
    dateReported: string;
    category: MaintenanceCategory;
    problemDescription: string;
    priority: Priority;
    status: TicketStatus;
    resolutionNotes: string;
    estimatedDowntime: string;
    assignedEmployeeIds: string[];
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
  equipmentOptions: { value: string; label: string }[];
  employeeOptions: { value: string; label: string }[];
}

export const MaintenanceForm = ({
  form,
  onSubmit,
  editing,
  equipmentOptions,
  employeeOptions,
}: MaintenanceFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <Select
        label="Equipment"
        required
        data={equipmentOptions}
        searchable
        {...form.getInputProps("equipmentId")}
      />
      <Select
        label="Reported By"
        required
        data={employeeOptions}
        searchable
        {...form.getInputProps("reportedBy")}
      />
      <TextInput
        label="Date Reported"
        type="date"
        required
        {...form.getInputProps("dateReported")}
      />
      <Select
        label="Category"
        required
        data={maintenanceCategoryOptions}
        {...form.getInputProps("category")}
      />
      <Textarea
        label="Problem Description"
        required
        autosize
        minRows={2}
        {...form.getInputProps("problemDescription")}
      />
      <Select
        label="Priority"
        required
        data={priorityOptions}
        {...form.getInputProps("priority")}
      />
      <Select
        label="Status"
        required
        data={statusOptions}
        {...form.getInputProps("status")}
      />
      <Textarea
        label="Resolution Notes"
        autosize
        minRows={2}
        {...form.getInputProps("resolutionNotes")}
      />
      <TextInput
        label="Estimated Downtime"
        {...form.getInputProps("estimatedDowntime")}
      />
      <EmployeeSelect {...form.getInputProps("assignedEmployeeIds")} />
      <Button type="submit">{editing ? "Update" : "Create"}</Button>
    </Stack>
  </form>
);
