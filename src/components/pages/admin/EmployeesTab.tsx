import { Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { Employee } from "@/types";

import { EmployeeForm } from "./EmployeeForm";

export const EmployeesTab = () => {
  const {
    departments,
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  const columns: Column<Employee>[] = [
    { header: "Name", accessor: "name" },
    { header: "Role", accessor: "role" },
    {
      header: "Department",
      accessor: (emp) =>
        departments.find((d) => d.id === emp.departmentId)?.name ?? "—",
      sortValue: (emp) =>
        departments.find((d) => d.id === emp.departmentId)?.name ?? "",
    },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
  ];

  const form = useForm({
    initialValues: {
      name: "",
      role: "",
      departmentId: "",
      email: "",
      phone: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        name: editing.name,
        role: editing.role,
        departmentId: editing.departmentId,
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

  const deptOptions = departments.map((d) => ({ value: d.id, label: d.name }));

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Employees</Title>
        <ModalButton
          label="Add Employee"
          onClick={() => handleOpen()}
          modalTitle={editing ? "Edit Employee" : "Add Employee"}
          opened={opened}
          onClose={handleClose}
          content={
            <EmployeeForm
              form={form}
              onSubmit={form.onSubmit(handleSubmit)}
              editing={!!editing}
              deptOptions={deptOptions}
            />
          }
        />
      </Group>
      <DataTable
        columns={columns}
        data={employees}
        onEdit={handleOpen}
        onDelete={deleteEmployee}
      />
    </Stack>
  );
};
