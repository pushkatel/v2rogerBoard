import { Badge, Button, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { ICAR, Priority, TicketStatus } from "@/types";
import { priorityColor, statusColor } from "@/utils";

import { ICARForm } from "./ICARForm";

export const Customer = () => {
  const { icars, employees, addICAR, updateICAR, deleteICAR } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<ICAR | null>(null);
  const [readOnly, setReadOnly] = useState(false);

  const columns: Column<ICAR>[] = useMemo(
    () => [
      { header: "Customer", accessor: "customer" },
      { header: "Open Date", accessor: "openDate" },
      { header: "Problem Title", accessor: "problemTitle" },
      {
        header: "Status",
        accessor: (i) => (
          <Badge color={statusColor[i.status]}>{i.status}</Badge>
        ),
        sortValue: (i) => i.status,
      },
      {
        header: "Priority",
        accessor: (i) => (
          <Badge color={priorityColor[i.priority]}>{i.priority}</Badge>
        ),
        sortValue: (i) => i.priority,
      },
      { header: "Job #", accessor: "jobNumber" },
      {
        header: "Assigned To",
        accessor: (i) =>
          i.assignedEmployeeIds
            .map((id) => employees.find((emp) => emp.id === id)?.name)
            .filter(Boolean)
            .join(", ") || "—",
        sortValue: (i) =>
          i.assignedEmployeeIds
            .map((id) => employees.find((emp) => emp.id === id)?.name ?? "")
            .join(", "),
      },
    ],
    [employees],
  );

  const form = useForm({
    initialValues: {
      customer: "",
      openDate: new Date().toISOString().slice(0, 10),
      jobNumber: "",
      releaseNumber: "",
      panelsAffected: 0,
      departmentId: "",
      problemTitle: "",
      problemDescription: "",
      whereOccurred: "",
      rootCause: "",
      containmentAction: "",
      status: "draft" as TicketStatus,
      priority: "medium" as Priority,
      assignedEmployeeIds: [] as string[],
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        customer: editing.customer,
        openDate: editing.openDate,
        jobNumber: editing.jobNumber,
        releaseNumber: editing.releaseNumber,
        panelsAffected: editing.panelsAffected,
        departmentId: editing.departmentId,
        problemTitle: editing.problemTitle,
        problemDescription: editing.problemDescription,
        whereOccurred: editing.whereOccurred,
        rootCause: editing.rootCause,
        containmentAction: editing.containmentAction,
        status: editing.status,
        priority: editing.priority,
        assignedEmployeeIds: editing.assignedEmployeeIds,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (icar?: ICAR) => {
    setEditing(icar ?? null);
    setReadOnly(!!icar);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
    setReadOnly(false);
    form.reset();
  };

  const handleSubmit = (values: typeof form.values) => {
    if (editing) {
      updateICAR({ ...editing, ...values });
    } else {
      addICAR({
        id: `icar-${Date.now()}`,
        ...values,
      });
    }
    handleClose();
  };

  const modalTitle = readOnly
    ? "View ICAR"
    : editing
      ? "Edit ICAR"
      : "New ICAR";

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Customer — ICARs</Title>
        <ModalButton
          label="New ICAR"
          onClick={() => handleOpen()}
          modalTitle={modalTitle}
          opened={opened}
          onClose={handleClose}
          modalSize="lg"
          content={
            <>
              <ICARForm
                form={form}
                onSubmit={form.onSubmit(handleSubmit)}
                editing={!!editing}
                readOnly={readOnly}
                onCancel={editing ? () => setReadOnly(true) : undefined}
              />
              {readOnly && editing && (
                <Group mt="md" justify="flex-end">
                  <Button variant="outline" onClick={() => setReadOnly(false)}>
                    Edit
                  </Button>
                  <Button
                    color="red"
                    variant="outline"
                    onClick={() => {
                      deleteICAR(editing.id);
                      handleClose();
                    }}
                  >
                    Delete
                  </Button>
                </Group>
              )}
            </>
          }
        />
      </Group>
      <DataTable columns={columns} data={icars} onEdit={handleOpen} />
    </Stack>
  );
};
