import { Badge, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { Ticket, TicketPriority, TicketStatus, TicketType } from "@/types";
import { ticketPriorityColor, ticketStatusColor, ticketTypeColor } from "@/utils";

import { TicketForm } from "./TicketForm";

export const Tickets = () => {
  const {
    tickets,
    employees,
    equipment,
    addTicket,
    updateTicket,
    deleteTicket,
  } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Ticket | null>(null);

  const columns: Column<Ticket>[] = useMemo(
    () => [
      { header: "Title", accessor: "title" },
      {
        header: "Type",
        accessor: (t) => (
          <Badge color={ticketTypeColor[t.type]}>{t.type}</Badge>
        ),
        sortValue: (t) => t.type,
      },
      {
        header: "Status",
        accessor: (t) => (
          <Badge color={ticketStatusColor[t.status]}>{t.status}</Badge>
        ),
        sortValue: (t) => t.status,
      },
      {
        header: "Priority",
        accessor: (t) => (
          <Badge color={ticketPriorityColor[t.priority]}>{t.priority}</Badge>
        ),
        sortValue: (t) => t.priority,
      },
      {
        header: "Assigned To",
        accessor: (t) =>
          t.assignedEmployeeIds
            .map((id) => employees.find((e) => e.id === id)?.name)
            .filter(Boolean)
            .join(", ") || "—",
        sortValue: (t) =>
          t.assignedEmployeeIds
            .map((id) => employees.find((e) => e.id === id)?.name ?? "")
            .join(", "),
      },
      {
        header: "Equipment",
        accessor: (t) =>
          equipment.find((e) => e.id === t.relatedEquipmentId)?.name ?? "—",
        sortValue: (t) =>
          equipment.find((e) => e.id === t.relatedEquipmentId)?.name ?? "",
      },
      { header: "Created", accessor: "createdAt" },
    ],
    [employees, equipment],
  );

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      type: "engineering" as TicketType,
      status: "open" as TicketStatus,
      priority: "medium" as TicketPriority,
      assignedEmployeeIds: [] as string[],
      relatedEquipmentId: null as string | null,
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        title: editing.title,
        description: editing.description,
        type: editing.type,
        status: editing.status,
        priority: editing.priority,
        assignedEmployeeIds: editing.assignedEmployeeIds,
        relatedEquipmentId: editing.relatedEquipmentId,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (ticket?: Ticket) => {
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
      updateTicket({ ...editing, ...values });
    } else {
      addTicket({
        id: `tick-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        ...values,
      });
    }
    handleClose();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Tickets</Title>
        <ModalButton
          label="New Ticket"
          onClick={() => handleOpen()}
          modalTitle={editing ? "Edit Ticket" : "New Ticket"}
          opened={opened}
          onClose={handleClose}
          modalSize="lg"
          content={
            <TicketForm
              form={form}
              onSubmit={form.onSubmit(handleSubmit)}
              editing={!!editing}
              equipmentOptions={equipment.map((e) => ({ value: e.id, label: e.name }))}
            />
          }
        />
      </Group>
      <DataTable
        columns={columns}
        data={tickets}
        onEdit={handleOpen}
        onDelete={deleteTicket}
      />
    </Stack>
  );
};
