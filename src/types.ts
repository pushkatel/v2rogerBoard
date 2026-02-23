export type TicketType = "engineering" | "customer";
export type TicketStatus = "open" | "in-progress" | "closed";
export type TicketPriority = "low" | "medium" | "high";
export type MachineStatus = "operational" | "maintenance" | "offline";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  assignedEmployeeId: string | null;
  relatedMachineId: string | null;
  createdAt: string;
}

export interface Machine {
  id: string;
  name: string;
  category: string;
  location: string;
  status: MachineStatus;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
}
