import type { MachineStatus, TicketPriority, TicketStatus, TicketType } from "./types";

export const ticketStatusColor: Record<TicketStatus, string> = {
  open: "blue",
  "in-progress": "yellow",
  closed: "green",
};

export const ticketPriorityColor: Record<TicketPriority, string> = {
  low: "gray",
  medium: "orange",
  high: "red",
};

export const ticketTypeColor: Record<TicketType, string> = {
  engineering: "violet",
  customer: "teal",
};

export const machineStatusColor: Record<MachineStatus, string> = {
  operational: "green",
  maintenance: "yellow",
  offline: "red",
};
