import { Checkbox, Group, MultiSelect, type MultiSelectProps } from "@mantine/core";
import { useMemo } from "react";

import { useAppContext } from "@/data/AppContext";

type EmployeeSelectProps = Omit<MultiSelectProps, "data" | "renderOption">;

export const EmployeeSelect = (props: EmployeeSelectProps) => {
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

  return (
    <MultiSelect
      label="Assigned Employees"
      data={employeeOptions}
      searchable
      renderOption={({ option, checked }) => (
        <Group gap="sm">
          <Checkbox checked={checked} onChange={() => {}} tabIndex={-1} readOnly />
          {option.label}
        </Group>
      )}
      {...props}
    />
  );
};
