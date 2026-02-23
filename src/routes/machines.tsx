import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useAppContext } from "../data/AppContext";
import type { Machine, MachineStatus } from "../types";
import { machineStatusColor } from "../utils";

const MachinesPage = () => {
  const { machines, addMachine, updateMachine, deleteMachine } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Machine | null>(null);

  const form = useForm({
    initialValues: {
      name: "",
      category: "",
      location: "",
      status: "operational" as MachineStatus,
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        name: editing.name,
        category: editing.category,
        location: editing.location,
        status: editing.status,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (machine?: Machine) => {
    setEditing(machine ?? null);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
    form.reset();
  };

  const handleSubmit = (values: typeof form.values) => {
    if (editing) {
      updateMachine({ ...editing, ...values });
    } else {
      addMachine({ id: `mach-${Date.now()}`, ...values });
    }
    handleClose();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Machines</Title>
        <Button onClick={() => handleOpen()}>Add Machine</Button>
      </Group>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {machines.map((m) => (
            <Table.Tr key={m.id}>
              <Table.Td>{m.name}</Table.Td>
              <Table.Td>{m.category}</Table.Td>
              <Table.Td>{m.location}</Table.Td>
              <Table.Td>
                <Badge color={machineStatusColor[m.status]}>{m.status}</Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" onClick={() => handleOpen(m)}>
                    Edit
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => deleteMachine(m.id)}
                  >
                    Del
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal opened={opened} onClose={handleClose} title={editing ? "Edit Machine" : "Add Machine"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Name" required {...form.getInputProps("name")} />
            <TextInput label="Category" required {...form.getInputProps("category")} />
            <TextInput label="Location" required {...form.getInputProps("location")} />
            <Select
              label="Status"
              required
              data={[
                { value: "operational", label: "Operational" },
                { value: "maintenance", label: "Maintenance" },
                { value: "offline", label: "Offline" },
              ]}
              {...form.getInputProps("status")}
            />
            <Button type="submit">{editing ? "Update" : "Create"}</Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};

export const Route = createFileRoute("/machines")({
  component: MachinesPage,
});
