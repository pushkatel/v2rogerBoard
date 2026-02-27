import {
  Button,
  type ComboboxData,
  List,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
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
      <TextInput label="Name" required {...form.getInputProps("name")} />
      <TextInput
        label="Serial Number"
        required
        {...form.getInputProps("serialNumber")}
      />
      <TextInput
        label="Category"
        required
        {...form.getInputProps("category")}
      />
      <Select
        label="Area"
        required
        data={areaOptions}
        searchable
        {...form.getInputProps("areaId")}
      />
      <Select
        label="Status"
        required
        data={equipmentStatusOptions}
        {...form.getInputProps("status")}
      />
      <TextInput
        label="Purchase Date"
        type="date"
        {...form.getInputProps("purchaseDate")}
      />
      <TextInput
        label="Installation Date"
        type="date"
        {...form.getInputProps("installDate")}
      />
      <TextInput
        label="Warranty Expiry Date"
        type="date"
        {...form.getInputProps("warrantyDate")}
      />
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
      <Button type="submit">{editing ? "Update" : "Create"}</Button>
    </Stack>
  </form>
);

const equipmentStatusOptions: { value: EquipmentStatus; label: string }[] = [
  { value: "operational", label: "Operational" },
  { value: "maintenance", label: "Maintenance" },
  { value: "offline", label: "Offline" },
];
