import { Badge, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { Department } from "@/types";

import { DepartmentForm } from "./DepartmentForm";

export const DepartmentsTab = () => {
  const {
    departments,
    areas,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addArea,
    deleteArea,
  } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Department | null>(null);

  const columns: Column<Department>[] = [
    { header: "Name", accessor: "name" },
    {
      header: "Areas",
      accessor: (dept) => {
        const deptAreas = areas.filter((a) => a.departmentId === dept.id);
        if (deptAreas.length === 0) return "—";
        return (
          <Group gap={4}>
            {deptAreas.map((a) => (
              <Badge key={a.id} variant="light" size="sm">
                {a.name}
              </Badge>
            ))}
          </Group>
        );
      },
    },
  ];

  const form = useForm({
    initialValues: { name: "", areaNames: [] as string[] },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        name: editing.name,
        areaNames: areas
          .filter((a) => a.departmentId === editing.id)
          .map((a) => a.name),
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (dept?: Department) => {
    setEditing(dept ?? null);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
    form.reset();
  };

  const handleSubmit = (values: typeof form.values) => {
    let deptId: string;
    if (editing) {
      updateDepartment({ ...editing, name: values.name });
      deptId = editing.id;
    } else {
      deptId = `dept-${Date.now()}`;
      addDepartment({ id: deptId, name: values.name });
    }

    const existingAreas = areas.filter((a) => a.departmentId === deptId);
    const existingNames = existingAreas.map((a) => a.name);

    existingAreas
      .filter((a) => !values.areaNames.includes(a.name))
      .forEach((a) => deleteArea(a.id));

    values.areaNames
      .filter((n) => !existingNames.includes(n))
      .forEach((n, i) =>
        addArea({
          id: `area-${Date.now()}-${i}`,
          name: n,
          departmentId: deptId,
        }),
      );

    handleClose();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Departments</Title>
        <ModalButton
          label="Add Department"
          onClick={() => handleOpen()}
          modalTitle={editing ? "Edit Department" : "Add Department"}
          opened={opened}
          onClose={handleClose}
          content={
            <DepartmentForm
              form={form}
              onSubmit={form.onSubmit(handleSubmit)}
              editing={!!editing}
            />
          }
        />
      </Group>
      <DataTable
        columns={columns}
        data={departments}
        onEdit={handleOpen}
        onDelete={deleteDepartment}
      />
    </Stack>
  );
};
