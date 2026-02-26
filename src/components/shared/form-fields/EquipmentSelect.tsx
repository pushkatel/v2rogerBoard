import { Select, type SelectProps } from "@mantine/core";
import { useMemo } from "react";

import { useAppContext } from "@/data/AppContext";

/**
 * Area-grouped equipment picker. Data is pulled from `AppContext`.
 *
 * Equipment is grouped by area, displayed as "Area (Department)".
 * All props are forwarded to the underlying Mantine `Select`.
 */
export const EquipmentSelect = (props: Omit<SelectProps, "data">) => {
  const { equipment, areas, departments } = useAppContext();

  const equipmentOptions = useMemo(() => {
    const grouped = new Map<string, { value: string; label: string }[]>();
    for (const eq of equipment) {
      const area = areas.find((a) => a.id === eq.areaId);
      const dept = area
        ? departments.find((d) => d.id === area.departmentId)
        : undefined;
      const group = area
        ? `${dept?.name ?? "Other"} — ${area.name}`
        : "Other";
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group)!.push({ value: eq.id, label: eq.name });
    }
    return Array.from(grouped, ([group, items]) => ({ group, items }));
  }, [equipment, areas, departments]);

  return <Select data={equipmentOptions} searchable {...props} />;
};
