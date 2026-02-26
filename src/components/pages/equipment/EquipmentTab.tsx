import { Badge, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { Equipment, EquipmentStatus } from "@/types";
import { equipmentStatusColor } from "@/utils";

import { EquipmentForm } from "./EquipmentForm";

export const EquipmentTab = () => {
  const { areas, departments, equipment, addEquipment, updateEquipment, deleteEquipment } =
    useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Equipment | null>(null);

  const columns: Column<Equipment>[] = [
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

  const handleOpen = (item?: Equipment) => {
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
        <Title order={3}>Equipment</Title>
        <ModalButton
          label="Add Equipment"
          onClick={() => handleOpen()}
          modalTitle={editing ? "Edit Equipment" : "Add Equipment"}
          opened={opened}
          onClose={handleClose}
          content={
            <EquipmentForm
              form={form}
              onSubmit={form.onSubmit(handleSubmit)}
              editing={!!editing}
              areaOptions={areaOptions}
            />
          }
        />
      </Group>
      <DataTable
        columns={columns}
        data={equipment}
        onEdit={handleOpen}
        onDelete={deleteEquipment}
      />
    </Stack>
  );
};
