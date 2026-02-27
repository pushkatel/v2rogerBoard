import {
  Button,
  Divider,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import {
  IconCalendar,
  IconFlag,
  IconHash,
  IconTag,
  IconUser,
} from "@tabler/icons-react";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import type { Priority, TicketStatus } from "@/types";
import { priorityOptions, statusOptions } from "@/utils";

interface ECNFormProps {
  form: UseFormReturnType<{
    title: string;
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
    <Stack gap="lg">
      <Stack>
        <TextInput label="Title" required {...form.getInputProps("title")} />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Customer"
            required
            leftSection={<IconUser size={16} />}
            {...form.getInputProps("customer")}
          />
          <TextInput
            label="Open Date"
            type="date"
            required
            leftSection={<IconCalendar size={16} />}
            {...form.getInputProps("openDate")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Release Number"
            required
            leftSection={<IconTag size={16} />}
            {...form.getInputProps("releaseNumber")}
          />
          <TextInput
            label="Job Number"
            required
            leftSection={<IconHash size={16} />}
            {...form.getInputProps("jobNumber")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
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
            leftSection={<IconFlag size={16} />}
            {...form.getInputProps("priority")}
          />
        </SimpleGrid>
      </Stack>

      <Divider label="Details" labelPosition="left" />

      <Stack>
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
      </Stack>

      <Button type="submit" fullWidth>
        {editing ? "Update" : "Create"}
      </Button>
    </Stack>
  </form>
);
