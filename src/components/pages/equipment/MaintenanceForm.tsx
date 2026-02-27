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
}

export const MaintenanceForm = ({
  form,
  onSubmit,
  editing,
}: MaintenanceFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack gap="lg">
      <Stack>
        <EquipmentSelect
          label="Equipment"
          required
          leftSection={<IconTool size={16} />}
          {...form.getInputProps("equipmentId")}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <EmployeeSelect
            multiple={false}
            label="Reported By"
            required
            leftSection={<IconUser size={16} />}
            {...form.getInputProps("reportedBy")}
          />
          <TextInput
            label="Date Reported"
            type="date"
            required
            leftSection={<IconCalendar size={16} />}
            {...form.getInputProps("dateReported")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Select
            label="Category"
            required
            data={maintenanceCategoryOptions}
            leftSection={<IconCategory size={16} />}
            {...form.getInputProps("category")}
          />
          <Select
            label="Priority"
            required
            data={priorityOptions}
            leftSection={<IconFlag size={16} />}
            {...form.getInputProps("priority")}
          />
          <Select
            label="Status"
            required
            data={statusOptions}
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
          {...form.getInputProps("problemDescription")}
        />
        <Textarea
          label="Resolution Notes"
          autosize
          minRows={2}
          {...form.getInputProps("resolutionNotes")}
        />
        <TextInput
          label="Estimated Downtime"
          leftSection={<IconClock size={16} />}
          {...form.getInputProps("estimatedDowntime")}
        />
        <EmployeeSelect {...form.getInputProps("assignedEmployeeIds")} />
      </Stack>

      <Button type="submit" fullWidth>
        {editing ? "Update" : "Create"}
      </Button>
    </Stack>
  </form>
);
