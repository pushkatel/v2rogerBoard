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

export const Machines = () => {
  const { areas, departments, machines, addMachine, updateMachine, deleteMachine } =
    useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Machine | null>(null);

  const columns: Column<Machine>[] = [
    { header: "Name", accessor: "name" },
    { header: "Category", accessor: "category" },
    {
      header: "Area",
      accessor: (m) => areas.find((a) => a.id === m.areaId)?.name ?? "—",
      sortValue: (m) => areas.find((a) => a.id === m.areaId)?.name ?? "",
    },
    {
      header: "Status",
      accessor: (m) => (
        <Badge color={machineStatusColor[m.status]}>{m.status}</Badge>
      ),
      sortValue: (m) => m.status,
    },
  ];

  const form = useForm({
    initialValues: {
      name: "",
      category: "",
      areaId: "",
      status: "operational" as MachineStatus,
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        name: editing.name,
        category: editing.category,
        areaId: editing.areaId,
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

  const areaOptions = areas.map((a) => {
    const deptName = departments.find((d) => d.id === a.departmentId)?.name;
    return { value: a.id, label: deptName ? `${a.name} (${deptName})` : a.name };
  });

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
            <Select
              label="Area"
              required
              data={areaOptions}
              {...form.getInputProps("areaId")}
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
