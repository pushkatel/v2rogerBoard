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
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import type { Column } from "../components/DataTable";
import { DataTable } from "../components/DataTable";
import { useAppContext } from "../data/AppContext";
import type { Ticket, TicketPriority, TicketStatus, TicketType } from "../types";
import { ticketPriorityColor, ticketStatusColor, ticketTypeColor } from "../utils";

const TicketsPage = () => {
  const { tickets, employees, machines, addTicket, updateTicket, deleteTicket } =
    useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Ticket | null>(null);

  const columns: Column<Ticket>[] = useMemo(
    () => [
      { header: "Title", accessor: "title" },
      {
        header: "Type",
        accessor: (t) => <Badge color={ticketTypeColor[t.type]}>{t.type}</Badge>,
        sortValue: (t) => t.type,
      },
      {
        header: "Status",
        accessor: (t) => <Badge color={ticketStatusColor[t.status]}>{t.status}</Badge>,
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
          employees.find((e) => e.id === t.assignedEmployeeId)?.name ?? "—",
        sortValue: (t) =>
          employees.find((e) => e.id === t.assignedEmployeeId)?.name ?? "",
      },
      {
        header: "Machine",
        accessor: (t) =>
          machines.find((m) => m.id === t.relatedMachineId)?.name ?? "—",
        sortValue: (t) =>
          machines.find((m) => m.id === t.relatedMachineId)?.name ?? "",
      },
      { header: "Created", accessor: "createdAt" },
    ],
    [employees, machines],
  );

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      type: "engineering" as TicketType,
      status: "open" as TicketStatus,
      priority: "medium" as TicketPriority,
      assignedEmployeeId: null as string | null,
      relatedMachineId: null as string | null,
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
        assignedEmployeeId: editing.assignedEmployeeId,
        relatedMachineId: editing.relatedMachineId,
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
        <Button onClick={() => handleOpen()}>New Ticket</Button>
      </Group>
      <DataTable
        columns={columns}
        data={tickets}
        onEdit={handleOpen}
        onDelete={deleteTicket}
      />
      <Modal
        opened={opened}
        onClose={handleClose}
        title={editing ? "Edit Ticket" : "New Ticket"}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Title" required {...form.getInputProps("title")} />
            <Textarea
              label="Description"
              required
              autosize
              minRows={3}
              {...form.getInputProps("description")}
            />
            <Select
              label="Type"
              required
              data={[
                { value: "engineering", label: "Engineering" },
                { value: "customer", label: "Customer" },
              ]}
              {...form.getInputProps("type")}
            />
            <Select
              label="Status"
              required
              data={[
                { value: "open", label: "Open" },
                { value: "in-progress", label: "In Progress" },
                { value: "closed", label: "Closed" },
              ]}
              {...form.getInputProps("status")}
            />
            <Select
              label="Priority"
              required
              data={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
              {...form.getInputProps("priority")}
            />
            <Select
              label="Assigned Employee"
              clearable
              data={employees.map((e) => ({ value: e.id, label: e.name }))}
              {...form.getInputProps("assignedEmployeeId")}
            />
            <Select
              label="Related Machine"
              clearable
              data={machines.map((m) => ({ value: m.id, label: m.name }))}
              {...form.getInputProps("relatedMachineId")}
            />
            <Button type="submit">{editing ? "Update" : "Create"}</Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};

export const Route = createFileRoute("/tickets")({
  component: TicketsPage,
});
