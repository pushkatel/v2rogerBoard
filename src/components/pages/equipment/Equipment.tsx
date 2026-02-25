import {
  Badge,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { useAppContext } from "@/data/AppContext";
import type { Equipment as EquipmentType, EquipmentStatus } from "@/types";
import { equipmentStatusColor } from "@/utils";

export const Equipment = () => {
  const { areas, departments, equipment, addEquipment, updateEquipment, deleteEquipment } =
    useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<EquipmentType | null>(null);

  const columns: Column<EquipmentType>[] = [
    { header: "Name", accessor: "name" },
    { header: "Serial Number", accessor: "serialNumber" },
    { header: "Category", accessor: "category" },
    {
      header: "Area",
      accessor: (e) => areas.find((a) => a.id === e.areaId)?.name ?? "—",
      sortValue: (e) => areas.find((a) => a.id === e.areaId)?.name ?? "",
    },
    {
      header: "Status",
      accessor: (e) => (
        <Badge color={equipmentStatusColor[e.status]}>{e.status}</Badge>
      ),
      sortValue: (e) => e.status,
    },
  ];

  const form = useForm({
    initialValues: {
      name: "",
      serialNumber: "",
      category: "",
      areaId: "",
      status: "operational" as EquipmentStatus,
      purchaseDate: "",
      installDate: "",
      warrantyDate: "",
      maintenanceCycleNotes: "",
    },
  });

  const areaOptions = departments.map((dept) => ({
    group: dept.name,
    items: areas
      .filter((a) => a.departmentId === dept.id)
      .map((a) => ({ value: a.id, label: a.name })),
  }));

  useEffect(() => {
    if (editing) {
      form.setValues({
        name: editing.name,
        serialNumber: editing.serialNumber,
        category: editing.category,
        areaId: editing.areaId,
        status: editing.status,
        purchaseDate: editing.purchaseDate,
        installDate: editing.installDate,
        warrantyDate: editing.warrantyDate,
        maintenanceCycleNotes: editing.maintenanceCycleNotes,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (item?: EquipmentType) => {
    setEditing(item ?? null);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
    form.reset();
  };

  const handleSubmit = (values: typeof form.values) => {
    if (editing) {
      updateEquipment({ ...editing, ...values });
    } else {
      addEquipment({ id: `equip-${Date.now()}`, ...values });
    }
    handleClose();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Equipment</Title>
        <Button onClick={() => handleOpen()}>Add Equipment</Button>
      </Group>
      <DataTable
        columns={columns}
        data={equipment}
        onEdit={handleOpen}
        onDelete={deleteEquipment}
      />
      <Modal
        opened={opened}
        onClose={handleClose}
        title={editing ? "Edit Equipment" : "Add Equipment"}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
            <Button type="submit">{editing ? "Update" : "Create"}</Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};

const equipmentStatusOptions: { value: EquipmentStatus; label: string }[] = [
  { value: "operational", label: "Operational" },
  { value: "maintenance", label: "Maintenance" },
  { value: "offline", label: "Offline" },
];
