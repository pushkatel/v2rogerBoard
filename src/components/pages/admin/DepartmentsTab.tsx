import { Badge, Button, Group, Modal, Stack, TagsInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { useAppContext } from "@/data/AppContext";
import type { Department } from "@/types";

export const DepartmentsTab = () => {
  const { departments, areas, addDepartment, updateDepartment, deleteDepartment, addArea, deleteArea } =
    useAppContext();
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
        addArea({ id: `area-${Date.now()}-${i}`, name: n, departmentId: deptId }),
      );

    handleClose();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Departments</Title>
        <Button onClick={() => handleOpen()}>Add Department</Button>
      </Group>
      <DataTable
        columns={columns}
        data={departments}
        onEdit={handleOpen}
        onDelete={deleteDepartment}
      />
      <Modal
        opened={opened}
        onClose={handleClose}
        title={editing ? "Edit Department" : "Add Department"}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Name" required {...form.getInputProps("name")} />
            <TagsInput
              label="Areas"
              placeholder="Type and press Enter to add"
              {...form.getInputProps("areaNames")}
            />
            <Button type="submit">{editing ? "Update" : "Create"}</Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
