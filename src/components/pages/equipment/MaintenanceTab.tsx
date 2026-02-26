import { Badge, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { MaintenanceCategory, MaintenanceTicket, Priority, TicketStatus } from "@/types";
import { priorityColor, statusColor } from "@/utils";

import { MaintenanceForm } from "./MaintenanceForm";

export const MaintenanceTab = () => {
  const {
    equipment,
    employees,
    maintenanceTickets,
    addMaintenanceTicket,
    updateMaintenanceTicket,
    deleteMaintenanceTicket,
  } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<MaintenanceTicket | null>(null);

  const columns: Column<MaintenanceTicket>[] = [
    {
      header: "Equipment",
      accessor: (t) => equipment.find((e) => e.id === t.equipmentId)?.name ?? "—",
      sortValue: (t) => equipment.find((e) => e.id === t.equipmentId)?.name ?? "",
    },
    {
      header: "Reported By",
      accessor: (t) => employees.find((e) => e.id === t.reportedBy)?.name ?? "—",
      sortValue: (t) => employees.find((e) => e.id === t.reportedBy)?.name ?? "",
    },
    { header: "Date", accessor: "dateReported" },
    { header: "Category", accessor: "category" },
    {
      header: "Priority",
      accessor: (t) => <Badge color={priorityColor[t.priority]}>{t.priority}</Badge>,
      sortValue: (t) => t.priority,
    },
    {
      header: "Status",
      accessor: (t) => <Badge color={statusColor[t.status]}>{t.status}</Badge>,
      sortValue: (t) => t.status,
    },
  ];

  const form = useForm({
    initialValues: {
      equipmentId: "",
      reportedBy: "",
      dateReported: "",
      category: "other" as MaintenanceCategory,
      problemDescription: "",
      priority: "medium" as Priority,
      status: "draft" as TicketStatus,
      resolutionNotes: "",
      estimatedDowntime: "",
      assignedEmployeeIds: [] as string[],
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        equipmentId: editing.equipmentId,
        reportedBy: editing.reportedBy,
        dateReported: editing.dateReported,
        category: editing.category,
        problemDescription: editing.problemDescription,
        priority: editing.priority,
        status: editing.status,
        resolutionNotes: editing.resolutionNotes,
        estimatedDowntime: editing.estimatedDowntime,
        assignedEmployeeIds: editing.assignedEmployeeIds,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (ticket?: MaintenanceTicket) => {
    setEditing(ticket ?? null);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
    form.reset();
  };

  const handleSubmit = (values: typeof form.values) => {
    if (editing) {
      updateMaintenanceTicket({ ...editing, ...values });
    } else {
      addMaintenanceTicket({ id: `mt-${Date.now()}`, ...values });
    }
    handleClose();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Maintenance Tickets</Title>
        <ModalButton
          label="Add Ticket"
          onClick={() => handleOpen()}
          modalTitle={editing ? "Edit Maintenance Ticket" : "Add Maintenance Ticket"}
          opened={opened}
          onClose={handleClose}
          content={
            <MaintenanceForm
              form={form}
              onSubmit={form.onSubmit(handleSubmit)}
              editing={!!editing}
            />
          }
        />
      </Group>
      <DataTable
        columns={columns}
        data={maintenanceTickets}
        onEdit={handleOpen}
        onDelete={deleteMaintenanceTicket}
      />
    </Stack>
  );
};
