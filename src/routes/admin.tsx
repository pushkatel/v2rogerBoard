import { Button, Group, Modal, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { DataTable } from "../components/DataTable";
import { useAppContext } from "../data/AppContext";
import type { Employee } from "../types";

const columns = [
  { header: "Name", accessor: "name" as const },
  { header: "Role", accessor: "role" as const },
  { header: "Department", accessor: "department" as const },
  { header: "Email", accessor: "email" as const },
  { header: "Phone", accessor: "phone" as const },
];

const AdminPage = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  const form = useForm({
    initialValues: {
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        name: editing.name,
        role: editing.role,
        department: editing.department,
        email: editing.email,
        phone: editing.phone,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (employee?: Employee) => {
    setEditing(employee ?? null);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
    form.reset();
  };

  const handleSubmit = (values: typeof form.values) => {
    if (editing) {
      updateEmployee({ ...editing, ...values });
    } else {
      addEmployee({ id: `emp-${Date.now()}`, ...values });
    }
    handleClose();
  };

  return (
    <Stack>
      <Title order={2}>Admin</Title>
      <Group justify="space-between">
        <Title order={3}>Employees</Title>
        <Button onClick={() => handleOpen()}>Add Employee</Button>
      </Group>
      <DataTable
        columns={columns}
        data={employees}
        onEdit={handleOpen}
        onDelete={deleteEmployee}
      />
      <Modal opened={opened} onClose={handleClose} title={editing ? "Edit Employee" : "Add Employee"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Name" required {...form.getInputProps("name")} />
            <TextInput label="Role" required {...form.getInputProps("role")} />
            <TextInput label="Department" required {...form.getInputProps("department")} />
            <TextInput label="Email" required {...form.getInputProps("email")} />
            <TextInput label="Phone" required {...form.getInputProps("phone")} />
            <Button type="submit">{editing ? "Update" : "Create"}</Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});
