import { Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { UsageLog, UsageType } from "@/types";

import { UsageLogForm } from "./UsageLogForm";

export const UsageLogTab = () => {
  const {
    equipment,
    employees,
    usageLogs,
    addUsageLog,
    updateUsageLog,
    deleteUsageLog,
  } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<UsageLog | null>(null);

  const columns: Column<UsageLog>[] = [
    {
      header: "Equipment",
      accessor: (l) =>
        equipment.find((e) => e.id === l.equipmentId)?.name ?? "—",
      sortValue: (l) =>
        equipment.find((e) => e.id === l.equipmentId)?.name ?? "",
    },
    {
      header: "Employee",
      accessor: (l) =>
        employees.find((e) => e.id === l.employeeId)?.name ?? "—",
      sortValue: (l) =>
        employees.find((e) => e.id === l.employeeId)?.name ?? "",
    },
    { header: "Date", accessor: "date" },
    { header: "Type", accessor: "usageType" },
    {
      header: "Quantity",
      accessor: (l) => l.quantity.toLocaleString(),
      sortValue: (l) => l.quantity,
    },
    { header: "Notes", accessor: "notes" },
  ];

  const form = useForm({
    initialValues: {
      equipmentId: "",
      employeeId: "",
      date: "",
      usageType: "hours" as UsageType,
      quantity: 0,
      notes: "",
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        equipmentId: editing.equipmentId,
        employeeId: editing.employeeId,
        date: editing.date,
        usageType: editing.usageType,
        quantity: editing.quantity,
        notes: editing.notes,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (log?: UsageLog) => {
    setEditing(log ?? null);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
    form.reset();
  };

  const handleSubmit = (values: typeof form.values) => {
    if (editing) {
      updateUsageLog({ ...editing, ...values });
    } else {
      addUsageLog({ id: `ul-${Date.now()}`, ...values });
    }
    handleClose();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Usage Log</Title>
        <ModalButton
          label="Log Usage"
          onClick={() => handleOpen()}
          modalTitle={editing ? "Edit Usage Entry" : "Log Usage"}
          opened={opened}
          onClose={handleClose}
          content={
            <UsageLogForm
              form={form}
              onSubmit={form.onSubmit(handleSubmit)}
              editing={!!editing}
            />
          }
        />
      </Group>
      <DataTable
        columns={columns}
        data={usageLogs}
        onEdit={handleOpen}
        onDelete={deleteUsageLog}
      />
    </Stack>
  );
};
