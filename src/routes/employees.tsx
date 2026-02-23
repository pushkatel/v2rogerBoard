import {
  ActionIcon,
  Button,
  Group,
  Modal,
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
import type { Employee } from "../types";

const EmployeesPage = () => {
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
      <Group justify="space-between">
        <Title order={2}>Employees</Title>
        <Button onClick={() => handleOpen()}>Add Employee</Button>
      </Group>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Department</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {employees.map((emp) => (
            <Table.Tr key={emp.id}>
              <Table.Td>{emp.name}</Table.Td>
              <Table.Td>{emp.role}</Table.Td>
              <Table.Td>{emp.department}</Table.Td>
              <Table.Td>{emp.email}</Table.Td>
              <Table.Td>{emp.phone}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" onClick={() => handleOpen(emp)}>
                    Edit
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Del
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

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

export const Route = createFileRoute("/employees")({
  component: EmployeesPage,
});
