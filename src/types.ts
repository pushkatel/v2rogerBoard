export type TicketType = "engineering" | "customer";
export type TicketStatus = "open" | "in-progress" | "closed";
export type TicketPriority = "low" | "medium" | "high";
export type EquipmentStatus = "operational" | "maintenance" | "offline";

export interface Department {
  id: string;
  name: string;
}

export interface Area {
  id: string;
  name: string;
  departmentId: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  assignedEmployeeId: string | null;
  relatedEquipmentId: string | null;
  createdAt: string;
}

export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  areaId: string;
  status: EquipmentStatus;
  purchaseDate: string;
  installDate: string;
  warrantyDate: string;
  maintenanceCycleNotes: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  email: string;
  phone: string;
}
