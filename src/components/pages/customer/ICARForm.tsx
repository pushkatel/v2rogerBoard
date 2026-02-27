import {
  Button,
  Divider,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import {
  IconBuilding,
  IconCalendar,
  IconFlag,
  IconHash,
  IconTag,
  IconUser,
} from "@tabler/icons-react";
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
      <Stack gap="lg">
        <Stack>
          <Divider label="Details" labelPosition="left" />
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
              label="Job Number"
              required
              leftSection={<IconHash size={16} />}
              {...form.getInputProps("jobNumber")}
            />
            <TextInput
              label="Release Number"
              required
              leftSection={<IconTag size={16} />}
              {...form.getInputProps("releaseNumber")}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
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
            <NumberInput
              label="Panels Affected"
              required
              min={0}
              {...form.getInputProps("panelsAffected")}
            />
          </SimpleGrid>
          <Select
            label="Department"
            data={departmentOptions}
            leftSection={<IconBuilding size={16} />}
            {...form.getInputProps("departmentId")}
          />
        </Stack>

        <Stack>
          <Divider label="Problem" labelPosition="left" />
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
        </Stack>

        <Stack>
          <Divider label="Resolution" labelPosition="left" />
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
        </Stack>

        <Button type="submit" fullWidth>
          {editing ? "Update" : "Create"}
        </Button>
      </Stack>
    </form>
  );
};
