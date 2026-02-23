import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Table,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useAppContext } from "../data/AppContext";
import type { Ticket, TicketPriority, TicketStatus, TicketType } from "../types";
import { ticketPriorityColor, ticketStatusColor, ticketTypeColor } from "../utils";

const TicketsPage = () => {
  const { tickets, employees, machines, addTicket, updateTicket, deleteTicket } =
    useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Ticket | null>(null);

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

  const employeeName = (id: string | null) =>
    employees.find((e) => e.id === id)?.name ?? "—";
  const machineName = (id: string | null) =>
    machines.find((m) => m.id === id)?.name ?? "—";

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Tickets</Title>
        <Button onClick={() => handleOpen()}>New Ticket</Button>
      </Group>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Priority</Table.Th>
            <Table.Th>Assigned To</Table.Th>
            <Table.Th>Machine</Table.Th>
            <Table.Th>Created</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tickets.map((t) => (
            <Table.Tr key={t.id}>
              <Table.Td>{t.title}</Table.Td>
              <Table.Td>
                <Badge color={ticketTypeColor[t.type]}>{t.type}</Badge>
              </Table.Td>
              <Table.Td>
                <Badge color={ticketStatusColor[t.status]}>{t.status}</Badge>
              </Table.Td>
              <Table.Td>
                <Badge color={ticketPriorityColor[t.priority]}>{t.priority}</Badge>
              </Table.Td>
              <Table.Td>{employeeName(t.assignedEmployeeId)}</Table.Td>
              <Table.Td>{machineName(t.relatedMachineId)}</Table.Td>
              <Table.Td>{t.createdAt}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" onClick={() => handleOpen(t)}>
                    Edit
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => deleteTicket(t.id)}
                  >
                    Del
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

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
