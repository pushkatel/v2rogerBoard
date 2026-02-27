import { Badge, Button, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type {
  MaintenanceCategory,
  MaintenanceTicket,
  Priority,
  TicketStatus,
} from "@/types";
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
  const [readOnly, setReadOnly] = useState(false);

  const columns: Column<MaintenanceTicket>[] = [
    { header: "Title", accessor: "title" },
    {
      header: "Equipment",
      accessor: (t) =>
        equipment.find((e) => e.id === t.equipmentId)?.name ?? "—",
      sortValue: (t) =>
        equipment.find((e) => e.id === t.equipmentId)?.name ?? "",
    },
    {
      header: "Reported By",
      accessor: (t) =>
        employees.find((e) => e.id === t.reportedBy)?.name ?? "—",
      sortValue: (t) =>
        employees.find((e) => e.id === t.reportedBy)?.name ?? "",
    },
    { header: "Date", accessor: "dateReported" },
    { header: "Category", accessor: "category" },
    {
      header: "Priority",
      accessor: (t) => (
        <Badge color={priorityColor[t.priority]}>{t.priority}</Badge>
      ),
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
      title: "",
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
        title: editing.title,
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
    setReadOnly(!!ticket);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
    setReadOnly(false);
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

  const modalTitle = readOnly
    ? "View Maintenance Ticket"
    : editing
      ? "Edit Maintenance Ticket"
      : "Add Maintenance Ticket";

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Maintenance Tickets</Title>
        <ModalButton
          label="Add Ticket"
          onClick={() => handleOpen()}
          modalTitle={modalTitle}
          opened={opened}
          onClose={handleClose}
          modalSize="lg"
          content={
            <>
              <MaintenanceForm
                form={form}
                onSubmit={form.onSubmit(handleSubmit)}
                editing={!!editing}
                readOnly={readOnly}
                onCancel={editing ? () => setReadOnly(true) : undefined}
              />
              {readOnly && editing && (
                <Group mt="md" justify="flex-end">
                  <Button variant="outline" onClick={() => setReadOnly(false)}>
                    Edit
                  </Button>
                  <Button
                    color="red"
                    variant="outline"
                    onClick={() => {
                      deleteMaintenanceTicket(editing.id);
                      handleClose();
                    }}
                  >
                    Delete
                  </Button>
                </Group>
              )}
            </>
          }
        />
      </Group>
      <DataTable
        columns={columns}
        data={maintenanceTickets}
        onEdit={handleOpen}
      />
    </Stack>
  );
};
