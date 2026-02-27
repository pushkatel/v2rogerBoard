import {
  Checkbox,
  Group,
  MultiSelect,
  type MultiSelectProps,
  Select,
  type SelectProps,
} from "@mantine/core";
import { useMemo } from "react";

import { useAppContext } from "@/data/AppContext";

/**
 * Department-grouped employee picker. Data is pulled from `AppContext`.
 *
 * - `multiple` omitted/`true` (default): `MultiSelect` with checkboxes, defaults label to "Assigned Employees"
 * - `multiple={false}`: `Select` — pass your own `label`
 *
 * All other props are forwarded to the underlying Mantine component.
 */
type EmployeeSelectProps =
  | ({ multiple?: true } & Omit<MultiSelectProps, "data" | "renderOption">)
  | ({ multiple: false } & Omit<SelectProps, "data">);

export const EmployeeSelect = ({ multiple, ...rest }: EmployeeSelectProps) => {
  const { employees, departments } = useAppContext();

  const employeeOptions = useMemo(() => {
    const grouped = new Map<string, { value: string; label: string }[]>();
    for (const emp of employees) {
      const dept = departments.find((d) => d.id === emp.departmentId);
      const group = dept?.name ?? "Other";
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group)!.push({ value: emp.id, label: emp.name });
    }
    return Array.from(grouped, ([group, items]) => ({ group, items }));
  }, [employees, departments]);

  if (multiple === false) {
    const selectProps = rest as Omit<SelectProps, "data">;
    return <Select data={employeeOptions} searchable {...selectProps} />;
  }

  const multiProps = rest as Omit<MultiSelectProps, "data" | "renderOption">;
  return (
    <MultiSelect
      label="Assigned Employees"
      data={employeeOptions}
      searchable
      renderOption={({ option, checked }) => (
        <Group gap="sm">
          <Checkbox
            checked={checked}
            onChange={() => {}}
            tabIndex={-1}
            readOnly
          />
          {option.label}
        </Group>
      )}
      {...multiProps}
    />
  );
};
