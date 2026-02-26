import { Badge, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { ICAR, ICARStatus, Priority } from "@/types";
import { icarStatusColor, priorityColor } from "@/utils";

import { ICARForm } from "./ICARForm";

export const Customer = () => {
  const { icars, addICAR, updateICAR, deleteICAR } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<ICAR | null>(null);

  const columns: Column<ICAR>[] = useMemo(
    () => [
      { header: "Customer", accessor: "customer" },
      { header: "Open Date", accessor: "openDate" },
      { header: "Problem Title", accessor: "problemTitle" },
      {
        header: "Status",
        accessor: (i) => (
          <Badge color={icarStatusColor[i.status]}>{i.status}</Badge>
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
      { header: "Release #", accessor: "releaseNumber" },
    ],
    [],
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
      status: "draft" as ICARStatus,
      priority: "medium" as Priority,
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
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (icar?: ICAR) => {
    setEditing(icar ?? null);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
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

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Customer — ICARs</Title>
        <ModalButton
          label="New ICAR"
          onClick={() => handleOpen()}
          modalTitle={editing ? "Edit ICAR" : "New ICAR"}
          opened={opened}
          onClose={handleClose}
          modalSize="lg"
          content={
            <ICARForm
              form={form}
              onSubmit={form.onSubmit(handleSubmit)}
              editing={!!editing}
            />
          }
        />
      </Group>
      <DataTable
        columns={columns}
        data={icars}
        onEdit={handleOpen}
        onDelete={deleteICAR}
      />
    </Stack>
  );
};
