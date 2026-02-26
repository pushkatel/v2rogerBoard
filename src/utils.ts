import type {
  ECNStatus,
  EquipmentStatus,
  Priority,
  TicketStatus,
  TicketType,
} from "./types";

export const ticketStatusColor: Record<TicketStatus, string> = {
  open: "blue",
  "in-progress": "yellow",
  closed: "green",
};

export const priorityColor: Record<Priority, string> = {
  low: "blue",
  medium: "green",
  high: "orange",
  critical: "red",
};

export const priorityOptions: { value: Priority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

export const ticketTypeColor: Record<TicketType, string> = {
  engineering: "violet",
  customer: "teal",
};

export const equipmentStatusColor: Record<EquipmentStatus, string> = {
  operational: "green",
  maintenance: "yellow",
  offline: "red",
};

export const ecnStatusColor: Record<ECNStatus, string> = {
  draft: "gray",
  open: "blue",
  "in-review": "yellow",
  approved: "green",
  closed: "red",
};


