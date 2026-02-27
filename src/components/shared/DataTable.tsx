import { Center, Group, Table, UnstyledButton } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  /** Provide a sortable value for columns that use a render function accessor. */
  sortValue?: (row: T) => string | number;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
}

type SortDir = "asc" | "desc";

const ICON_SIZE = 14;

export const DataTable = <T extends { id: string }>({
  columns,
  data,
  onEdit,
}: DataTableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (header: string) => {
    if (sortKey === header) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(header);
      setSortDir("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.header === sortKey);
    if (!col) return data;

    const getValue = (row: T): string | number => {
      if (col.sortValue) return col.sortValue(row);
      if (typeof col.accessor === "function") return "";
      const val = row[col.accessor];
      if (typeof val === "number") return val;
      return String(val ?? "");
    };

    return [...data].sort((a, b) => {
      const aVal = getValue(a);
      const bVal = getValue(b);
      const cmp =
        typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir, columns]);

  const SortIcon = ({ header }: { header: string }) => {
    if (sortKey !== header)
      return <IconSelector size={ICON_SIZE} color="gray" />;
    return sortDir === "asc" ? (
      <IconChevronUp size={ICON_SIZE} />
    ) : (
      <IconChevronDown size={ICON_SIZE} />
    );
  };

  const isSortable = (col: Column<T>) =>
    typeof col.accessor !== "function" || col.sortValue;

  const renderCell = (row: T, col: Column<T>) => {
    if (typeof col.accessor === "function") return col.accessor(row);
    return row[col.accessor] as ReactNode;
  };

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          {columns.map((col) => (
            <Table.Th key={col.header}>
              {isSortable(col) ? (
                <UnstyledButton onClick={() => handleSort(col.header)}>
                  <Group gap={4} wrap="nowrap">
                    <span style={{ fontWeight: 700 }}>{col.header}</span>
                    <Center style={{ width: ICON_SIZE, height: ICON_SIZE }}>
                      <SortIcon header={col.header} />
                    </Center>
                  </Group>
                </UnstyledButton>
              ) : (
                col.header
              )}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {sortedData.map((row) => (
          <Table.Tr
            key={row.id}
            onClick={onEdit ? () => onEdit(row) : undefined}
            style={onEdit ? { cursor: "pointer" } : undefined}
          >
            {columns.map((col) => (
              <Table.Td key={col.header}>{renderCell(row, col)}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
