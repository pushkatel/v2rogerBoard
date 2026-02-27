import {
  Button,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import {
  IconAt,
  IconBuildingStore,
  IconCalendar,
  IconHash,
  IconPhone,
  IconTool,
  IconUser,
} from "@tabler/icons-react";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import { EquipmentSelect } from "@/components/shared/form-fields/EquipmentSelect";

interface ContractFormProps {
  form: UseFormReturnType<{
    equipmentId: string;
    vendor: string;
    contractNumber: string;
    startDate: string;
    endDate: string;
    summary: string;
    companyLeadId: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
  readOnly?: boolean;
  onCancel?: () => void;
}

export const ContractForm = ({
  form,
  onSubmit,
  editing,
  readOnly,
  onCancel,
}: ContractFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack gap="lg">
      <Stack>
        <Divider label="Contract Details" labelPosition="left" />
        <EquipmentSelect
          label="Equipment"
          required
          disabled={readOnly}
          leftSection={<IconTool size={16} />}
          {...form.getInputProps("equipmentId")}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Vendor"
            required
            readOnly={readOnly}
            leftSection={<IconBuildingStore size={16} />}
            {...form.getInputProps("vendor")}
          />
          <TextInput
            label="Contract Number"
            required
            readOnly={readOnly}
            leftSection={<IconHash size={16} />}
            {...form.getInputProps("contractNumber")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Start Date"
            type="date"
            required
            readOnly={readOnly}
            leftSection={<IconCalendar size={16} />}
            {...form.getInputProps("startDate")}
          />
          <TextInput
            label="End Date"
            type="date"
            required
            readOnly={readOnly}
            leftSection={<IconCalendar size={16} />}
            {...form.getInputProps("endDate")}
          />
        </SimpleGrid>
        <Textarea
          label="Contract Summary"
          description="Summarize coverage scope, maintenance cycles, key terms, etc."
          autosize
          minRows={3}
          readOnly={readOnly}
          {...form.getInputProps("summary")}
        />
      </Stack>

      <Stack>
        <Divider label="Contact" labelPosition="left" />
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <TextInput
            label="Contact Name"
            required
            readOnly={readOnly}
            leftSection={<IconUser size={16} />}
            {...form.getInputProps("contactName")}
          />
          <TextInput
            label="Contact Email"
            type="email"
            required
            readOnly={readOnly}
            leftSection={<IconAt size={16} />}
            {...form.getInputProps("contactEmail")}
          />
          <TextInput
            label="Contact Phone"
            type="tel"
            required
            readOnly={readOnly}
            leftSection={<IconPhone size={16} />}
            {...form.getInputProps("contactPhone")}
          />
        </SimpleGrid>
        <EmployeeSelect
          multiple={false}
          label="Company Lead"
          required
          disabled={readOnly}
          leftSection={<IconUser size={16} />}
          {...form.getInputProps("companyLeadId")}
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
