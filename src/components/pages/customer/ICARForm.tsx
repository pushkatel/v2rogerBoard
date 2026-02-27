import {
  Button,
  Divider,
  Group,
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
  readOnly?: boolean;
  onCancel?: () => void;
}

export const ICARForm = ({
  form,
  onSubmit,
  editing,
  readOnly,
  onCancel,
}: ICARFormProps) => {
  const { departments } = useAppContext();

  const departmentOptions = departments.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="lg">
        <Stack>
          <TextInput
            label="Title"
            required
            readOnly={readOnly}
            {...form.getInputProps("problemTitle")}
          />
          <Divider label="Details" labelPosition="left" />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Customer"
              required
              readOnly={readOnly}
              leftSection={<IconUser size={16} />}
              {...form.getInputProps("customer")}
            />
            <TextInput
              label="Open Date"
              type="date"
              required
              readOnly={readOnly}
              leftSection={<IconCalendar size={16} />}
              {...form.getInputProps("openDate")}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Job Number"
              required
              readOnly={readOnly}
              leftSection={<IconHash size={16} />}
              {...form.getInputProps("jobNumber")}
            />
            <TextInput
              label="Release Number"
              required
              readOnly={readOnly}
              leftSection={<IconTag size={16} />}
              {...form.getInputProps("releaseNumber")}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Select
              label="Status"
              required
              data={statusOptions}
              disabled={readOnly}
              {...form.getInputProps("status")}
            />
            <Select
              label="Priority"
              required
              data={priorityOptions}
              disabled={readOnly}
              leftSection={<IconFlag size={16} />}
              {...form.getInputProps("priority")}
            />
            <NumberInput
              label="Panels Affected"
              required
              min={0}
              readOnly={readOnly}
              {...form.getInputProps("panelsAffected")}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Select
              label="Department"
              data={departmentOptions}
              disabled={readOnly}
              leftSection={<IconBuilding size={16} />}
              {...form.getInputProps("departmentId")}
            />
            <EmployeeSelect
              disabled={readOnly}
              {...form.getInputProps("assignedEmployeeIds")}
            />
          </SimpleGrid>
        </Stack>

        <Stack>
          <Divider label="Problem" labelPosition="left" />
          <Textarea
            label="Problem Description"
            autosize
            minRows={3}
            readOnly={readOnly}
            {...form.getInputProps("problemDescription")}
          />
          <Textarea
            label="Where Occurred"
            autosize
            minRows={3}
            readOnly={readOnly}
            {...form.getInputProps("whereOccurred")}
          />
        </Stack>

        <Stack>
          <Divider label="Resolution" labelPosition="left" />
          <Textarea
            label="Root Cause"
            autosize
            minRows={3}
            readOnly={readOnly}
            {...form.getInputProps("rootCause")}
          />
          <Textarea
            label="Containment Action"
            autosize
            minRows={3}
            readOnly={readOnly}
            {...form.getInputProps("containmentAction")}
          />
        </Stack>

        {!readOnly &&
          (onCancel ? (
            <Group justify="flex-end">
              <Button variant="subtle" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">{editing ? "Update" : "Create"}</Button>
            </Group>
          ) : (
            <Button type="submit" fullWidth>
              {editing ? "Update" : "Create"}
            </Button>
          ))}
      </Stack>
    </form>
  );
};
