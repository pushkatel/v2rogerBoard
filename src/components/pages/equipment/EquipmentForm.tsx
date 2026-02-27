import {
  Button,
  type ComboboxData,
  List,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import {
  IconBarcode,
  IconCalendar,
  IconCategory,
  IconMapPin,
  IconTool,
} from "@tabler/icons-react";
import type { FormEventHandler } from "react";

import type { EquipmentStatus, MaintenanceContract } from "@/types";

interface EquipmentFormProps {
  form: UseFormReturnType<{
    name: string;
    serialNumber: string;
    category: string;
    areaId: string;
    status: EquipmentStatus;
    purchaseDate: string;
    installDate: string;
    warrantyDate: string;
    maintenanceCycleNotes: string;
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
  areaOptions: ComboboxData;
  relatedContracts?: MaintenanceContract[];
}

export const EquipmentForm = ({
  form,
  onSubmit,
  editing,
  areaOptions,
  relatedContracts,
}: EquipmentFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput
          label="Name"
          required
          leftSection={<IconTool size={16} />}
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Serial Number"
          required
          leftSection={<IconBarcode size={16} />}
          {...form.getInputProps("serialNumber")}
        />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput
          label="Category"
          required
          leftSection={<IconCategory size={16} />}
          {...form.getInputProps("category")}
        />
        <Select
          label="Area"
          required
          data={areaOptions}
          searchable
          leftSection={<IconMapPin size={16} />}
          {...form.getInputProps("areaId")}
        />
      </SimpleGrid>
      <Select
        label="Status"
        required
        data={equipmentStatusOptions}
        {...form.getInputProps("status")}
      />
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <TextInput
          label="Purchase Date"
          type="date"
          leftSection={<IconCalendar size={16} />}
          {...form.getInputProps("purchaseDate")}
        />
        <TextInput
          label="Installation Date"
          type="date"
          leftSection={<IconCalendar size={16} />}
          {...form.getInputProps("installDate")}
        />
        <TextInput
          label="Warranty Expiration"
          type="date"
          leftSection={<IconCalendar size={16} />}
          {...form.getInputProps("warrantyDate")}
        />
      </SimpleGrid>
      <Textarea
        label="Maintenance Cycle Details"
        autosize
        minRows={2}
        {...form.getInputProps("maintenanceCycleNotes")}
      />
      {relatedContracts && relatedContracts.length > 0 && (
        <div>
          <Text fw={500} size="sm" mb={4}>
            Related Contracts
          </Text>
          <List size="sm">
            {relatedContracts.map((c) => (
              <List.Item key={c.id}>
                {c.vendor} — {c.contractNumber}
              </List.Item>
            ))}
          </List>
        </div>
      )}
      <Button type="submit" fullWidth>
        {editing ? "Update" : "Create"}
      </Button>
    </Stack>
  </form>
);

const equipmentStatusOptions: { value: EquipmentStatus; label: string }[] = [
  { value: "operational", label: "Operational" },
  { value: "maintenance", label: "Maintenance" },
  { value: "offline", label: "Offline" },
];
