import type {
  EquipmentStatus,
  Priority,
  TicketStatus,
} from "./types";

export const statusColor: Record<TicketStatus, string> = {
  draft: "gray",
  open: "blue",
  "in-review": "yellow",
  approved: "green",
  closed: "red",
};

export const statusOptions: { value: TicketStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "open", label: "Open" },
  { value: "in-review", label: "In Review" },
  { value: "approved", label: "Approved" },
  { value: "closed", label: "Closed" },
];

export const priorityColor: Record<Priority, string> = {
  low: "blue",
  medium: "green",
  high: "orange",
  critical: "red",
};

export const priorityOptions: { value: Priority; label: string }[] = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export const equipmentStatusColor: Record<EquipmentStatus, string> = {
  operational: "green",
  maintenance: "yellow",
  offline: "red",
};

export const equipmentStatusOptions: {
  value: EquipmentStatus;
  label: string;
}[] = [
  { value: "operational", label: "Operational" },
  { value: "maintenance", label: "Maintenance" },
  { value: "offline", label: "Offline" },
];

