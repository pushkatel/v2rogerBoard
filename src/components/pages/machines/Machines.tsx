import {
  Badge,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { useAppContext } from "@/data/AppContext";
import type { Machine, MachineStatus } from "@/types";
import { machineStatusColor } from "@/utils";

const columns: Column<Machine>[] = [
  { header: "Name", accessor: "name" },
  { header: "Category", accessor: "category" },
  { header: "Location", accessor: "location" },
  {
    header: "Status",
    accessor: (m) => (
      <Badge color={machineStatusColor[m.status]}>{m.status}</Badge>
    ),
    sortValue: (m) => m.status,
  },
];

export const Machines = () => {
  const { machines, addMachine, updateMachine, deleteMachine } =
    useAppContext();
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
      <DataTable
        columns={columns}
        data={machines}
        onEdit={handleOpen}
        onDelete={deleteMachine}
      />
      <Modal
        opened={opened}
        onClose={handleClose}
        title={editing ? "Edit Machine" : "Add Machine"}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Name" required {...form.getInputProps("name")} />
            <TextInput
              label="Category"
              required
              {...form.getInputProps("category")}
            />
            <TextInput
              label="Location"
              required
              {...form.getInputProps("location")}
            />
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
