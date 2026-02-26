import { Button, Select, Stack, Textarea, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import type { Priority, TicketStatus, TicketType } from "@/types";
import { priorityOptions, statusOptions } from "@/utils";

interface TicketFormProps {
  form: UseFormReturnType<{
    title: string;
    description: string;
    type: TicketType;
    status: TicketStatus;
    priority: Priority;
    assignedEmployeeIds: string[];
    relatedEquipmentId: string | null;
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
  equipmentOptions: { value: string; label: string }[];
}

export const TicketForm = ({
  form,
  onSubmit,
  editing,
  equipmentOptions,
}: TicketFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <TextInput
        label="Title"
        required
        {...form.getInputProps("title")}
      />
      <Textarea
        label="Description"
        required
        autosize
        minRows={3}
        {...form.getInputProps("description")}
      />
      <Select
        label="Type"
        required
        data={ticketTypeOptions}
        {...form.getInputProps("type")}
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
      <EmployeeSelect {...form.getInputProps("assignedEmployeeIds")} />
      <Select
        label="Related Equipment"
        clearable
        data={equipmentOptions}
        {...form.getInputProps("relatedEquipmentId")}
      />
      <Button type="submit">{editing ? "Update" : "Create"}</Button>
    </Stack>
  </form>
);

const ticketTypeOptions: { value: TicketType; label: string }[] = [
  { value: "engineering", label: "Engineering" },
  { value: "customer", label: "Customer" },
];


