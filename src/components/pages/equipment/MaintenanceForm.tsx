import {
  Button,
  Divider,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import {
  IconCalendar,
  IconCategory,
  IconClock,
  IconFlag,
  IconTool,
  IconUser,
} from "@tabler/icons-react";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import { EquipmentSelect } from "@/components/shared/form-fields/EquipmentSelect";
import type { MaintenanceCategory, Priority, TicketStatus } from "@/types";
import {
  maintenanceCategoryOptions,
  priorityOptions,
  statusOptions,
} from "@/utils";

interface MaintenanceFormProps {
  form: UseFormReturnType<{
    title: string;
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
  readOnly?: boolean;
  onCancel?: () => void;
}

export const MaintenanceForm = ({
  form,
  onSubmit,
  editing,
  readOnly,
  onCancel,
}: MaintenanceFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack gap="lg">
      <Stack>
        <TextInput
          label="Title"
          required
          readOnly={readOnly}
          {...form.getInputProps("title")}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <EquipmentSelect
            label="Equipment"
            required
            disabled={readOnly}
            leftSection={<IconTool size={16} />}
            {...form.getInputProps("equipmentId")}
          />
          <EmployeeSelect
            multiple={false}
            label="Reported By"
            required
            disabled={readOnly}
            leftSection={<IconUser size={16} />}
            {...form.getInputProps("reportedBy")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Date Reported"
            type="date"
            required
            readOnly={readOnly}
            leftSection={<IconCalendar size={16} />}
            {...form.getInputProps("dateReported")}
          />
          <TextInput
            label="Estimated Downtime"
            readOnly={readOnly}
            leftSection={<IconClock size={16} />}
            {...form.getInputProps("estimatedDowntime")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Select
            label="Category"
            required
            data={maintenanceCategoryOptions}
            disabled={readOnly}
            leftSection={<IconCategory size={16} />}
            {...form.getInputProps("category")}
          />
          <Select
            label="Priority"
            required
            data={priorityOptions}
            disabled={readOnly}
            leftSection={<IconFlag size={16} />}
            {...form.getInputProps("priority")}
          />
          <Select
            label="Status"
            required
            data={statusOptions}
            disabled={readOnly}
            {...form.getInputProps("status")}
          />
        </SimpleGrid>
      </Stack>

      <Divider label="Notes & Resolution" labelPosition="left" />

      <Stack>
        <Textarea
          label="Problem Description"
          required
          autosize
          minRows={2}
          readOnly={readOnly}
          {...form.getInputProps("problemDescription")}
        />
        <Textarea
          label="Resolution Notes"
          autosize
          minRows={2}
          readOnly={readOnly}
          {...form.getInputProps("resolutionNotes")}
        />
        <EmployeeSelect
          disabled={readOnly}
          {...form.getInputProps("assignedEmployeeIds")}
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
