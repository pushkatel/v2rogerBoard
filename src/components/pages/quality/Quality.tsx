import { Badge, Button, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { ECN, Priority, TicketStatus } from "@/types";
import { priorityColor, statusColor } from "@/utils";

import { ECNForm } from "./ECNForm";

export const Quality = () => {
  const { ecns, employees, addECN, updateECN, deleteECN } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<ECN | null>(null);
  const [readOnly, setReadOnly] = useState(false);

  const columns: Column<ECN>[] = useMemo(
    () => [
      { header: "Title", accessor: "title" },
      { header: "Customer", accessor: "customer" },
      { header: "Open Date", accessor: "openDate" },
      { header: "Job #", accessor: "jobNumber" },
      {
        header: "Status",
        accessor: (e) => (
          <Badge color={statusColor[e.status]}>{e.status}</Badge>
        ),
        sortValue: (e) => e.status,
      },
      {
        header: "Priority",
        accessor: (e) => (
          <Badge color={priorityColor[e.priority]}>{e.priority}</Badge>
        ),
        sortValue: (e) => e.priority,
      },
      {
        header: "Assigned To",
        accessor: (e) =>
          e.assignedEmployeeIds
            .map((id) => employees.find((emp) => emp.id === id)?.name)
            .filter(Boolean)
            .join(", ") || "—",
        sortValue: (e) =>
          e.assignedEmployeeIds
            .map((id) => employees.find((emp) => emp.id === id)?.name ?? "")
            .join(", "),
      },
    ],
    [employees],
  );

  const form = useForm({
    initialValues: {
      title: "",
      customer: "",
      openDate: new Date().toISOString().slice(0, 10),
      releaseNumber: "",
      jobNumber: "",
      status: "draft" as TicketStatus,
      priority: "medium" as Priority,
      reason: "",
      correctiveChanges: "",
      assignedEmployeeIds: [] as string[],
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        title: editing.title,
        customer: editing.customer,
        openDate: editing.openDate,
        releaseNumber: editing.releaseNumber,
        jobNumber: editing.jobNumber,
        status: editing.status,
        priority: editing.priority,
        reason: editing.reason,
        correctiveChanges: editing.correctiveChanges,
        assignedEmployeeIds: editing.assignedEmployeeIds,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (ecn?: ECN) => {
    setEditing(ecn ?? null);
    setReadOnly(!!ecn);
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
      updateECN({ ...editing, ...values });
    } else {
      addECN({
        id: `ecn-${Date.now()}`,
        ...values,
      });
    }
    handleClose();
  };

  const modalTitle = readOnly ? "View ECN" : editing ? "Edit ECN" : "New ECN";

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Quality — ECNs</Title>
        <ModalButton
          label="New ECN"
          onClick={() => handleOpen()}
          modalTitle={modalTitle}
          opened={opened}
          onClose={handleClose}
          modalSize="lg"
          content={
            <>
              <ECNForm
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
                      deleteECN(editing.id);
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
      <DataTable columns={columns} data={ecns} onEdit={handleOpen} />
    </Stack>
  );
};
