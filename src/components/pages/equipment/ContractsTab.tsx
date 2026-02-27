import { Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { Column } from "@/components/shared/DataTable";
import { DataTable } from "@/components/shared/DataTable";
import { ModalButton } from "@/components/shared/ModalButton";
import { useAppContext } from "@/data/AppContext";
import type { MaintenanceContract } from "@/types";

import { ContractForm } from "./ContractForm";

export const ContractsTab = () => {
  const {
    equipment,
    employees,
    maintenanceContracts,
    addMaintenanceContract,
    updateMaintenanceContract,
    deleteMaintenanceContract,
  } = useAppContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<MaintenanceContract | null>(null);

  const columns: Column<MaintenanceContract>[] = [
    {
      header: "Equipment",
      accessor: (c) =>
        equipment.find((e) => e.id === c.equipmentId)?.name ?? "—",
      sortValue: (c) =>
        equipment.find((e) => e.id === c.equipmentId)?.name ?? "",
    },
    { header: "Vendor", accessor: "vendor" },
    { header: "Contract #", accessor: "contractNumber" },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    {
      header: "Company Lead",
      accessor: (c) =>
        employees.find((e) => e.id === c.companyLeadId)?.name ?? "—",
      sortValue: (c) =>
        employees.find((e) => e.id === c.companyLeadId)?.name ?? "",
    },
    { header: "Contact", accessor: "contactName" },
  ];

  const form = useForm({
    initialValues: {
      equipmentId: "",
      vendor: "",
      contractNumber: "",
      startDate: "",
      endDate: "",
      description: "",
      summary: "",
      companyLeadId: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  useEffect(() => {
    if (editing) {
      form.setValues({
        equipmentId: editing.equipmentId,
        vendor: editing.vendor,
        contractNumber: editing.contractNumber,
        startDate: editing.startDate,
        endDate: editing.endDate,
        description: editing.description,
        summary: editing.summary,
        companyLeadId: editing.companyLeadId,
        contactName: editing.contactName,
        contactEmail: editing.contactEmail,
        contactPhone: editing.contactPhone,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleOpen = (contract?: MaintenanceContract) => {
    setEditing(contract ?? null);
    open();
  };

  const handleClose = () => {
    close();
    setEditing(null);
    form.reset();
  };

  const handleSubmit = (values: typeof form.values) => {
    if (editing) {
      updateMaintenanceContract({ ...editing, ...values });
    } else {
      addMaintenanceContract({ id: `mc-${Date.now()}`, ...values });
    }
    handleClose();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Maintenance Contracts</Title>
        <ModalButton
          label="Add Contract"
          onClick={() => handleOpen()}
          modalTitle={
            editing ? "Edit Maintenance Contract" : "Add Maintenance Contract"
          }
          opened={opened}
          onClose={handleClose}
          content={
            <ContractForm
              form={form}
              onSubmit={form.onSubmit(handleSubmit)}
              editing={!!editing}
            />
          }
        />
      </Group>
      <DataTable
        columns={columns}
        data={maintenanceContracts}
        onEdit={handleOpen}
        onDelete={deleteMaintenanceContract}
      />
    </Stack>
  );
};
