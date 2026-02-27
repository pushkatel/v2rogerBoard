import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { FormEventHandler } from "react";

import { EmployeeSelect } from "@/components/shared/form-fields/EmployeeSelect";
import { EquipmentSelect } from "@/components/shared/form-fields/EquipmentSelect";

interface ContractFormProps {
  form: UseFormReturnType<{
    equipmentId: string;
    vendor: string;
    contractNumber: string;
    startDate: string;
    endDate: string;
    description: string;
    summary: string;
    companyLeadId: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  }>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  editing: boolean;
}

export const ContractForm = ({
  form,
  onSubmit,
  editing,
}: ContractFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack>
      <EquipmentSelect
        label="Equipment"
        required
        {...form.getInputProps("equipmentId")}
      />
      <TextInput label="Vendor" required {...form.getInputProps("vendor")} />
      <TextInput
        label="Contract Number"
        required
        {...form.getInputProps("contractNumber")}
      />
      <TextInput
        label="Start Date"
        type="date"
        required
        {...form.getInputProps("startDate")}
      />
      <TextInput
        label="End Date"
        type="date"
        required
        {...form.getInputProps("endDate")}
      />
      <Textarea
        label="Contract Details"
        required
        autosize
        minRows={2}
        {...form.getInputProps("description")}
      />
      <Textarea
        label="Contract Summary"
        description="Summarize coverage scope, maintenance cycles, key terms, etc."
        autosize
        minRows={3}
        {...form.getInputProps("summary")}
      />
      <EmployeeSelect
        multiple={false}
        label="Company Lead"
        required
        {...form.getInputProps("companyLeadId")}
      />
      <TextInput
        label="Contact Name"
        required
        {...form.getInputProps("contactName")}
      />
      <TextInput
        label="Contact Email"
        type="email"
        required
        {...form.getInputProps("contactEmail")}
      />
      <TextInput
        label="Contact Phone"
        type="tel"
        required
        {...form.getInputProps("contactPhone")}
      />
      <Button type="submit">{editing ? "Update" : "Create"}</Button>
    </Stack>
  </form>
);
