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
  assignedEmployeeIds: string[];
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

export type ECNStatus = "draft" | "open" | "in-review" | "approved" | "closed";
export type ECNPriority = "low" | "medium" | "high";

export interface ECN {
  id: string;
  customer: string;
  openDate: string;
  releaseNumber: string;
  jobNumber: string;
  status: ECNStatus;
  priority: ECNPriority;
  assignedEmployeeIds: string[];
}
