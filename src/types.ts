export type TicketStatus =
  | "draft"
  | "open"
  | "in-review"
  | "approved"
  | "closed";
export type Priority = "low" | "medium" | "high" | "critical";
export type EquipmentStatus = "operational" | "maintenance" | "offline";
export type MaintenanceCategory =
  | "electrical"
  | "mechanical"
  | "software"
  | "calibration"
  | "other";

export interface Department {
  id: string;
  name: string;
}

export interface Area {
  id: string;
  name: string;
  departmentId: string;
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

export interface ICAR {
  id: string;
  customer: string;
  openDate: string;
  jobNumber: string;
  releaseNumber: string;
  panelsAffected: number;
  departmentId: string;
  problemTitle: string;
  problemDescription: string;
  whereOccurred: string;
  rootCause: string;
  containmentAction: string;
  status: TicketStatus;
  priority: Priority;
  assignedEmployeeIds: string[];
}

export interface ECN {
  id: string;
  customer: string;
  openDate: string;
  releaseNumber: string;
  jobNumber: string;
  status: TicketStatus;
  priority: Priority;
  reason: string;
  correctiveChanges: string;
  assignedEmployeeIds: string[];
}

export interface MaintenanceContract {
  id: string;
  equipmentId: string;
  vendor: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  summary: string;
  companyLeadId: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export type UsageType = "hours" | "cycles" | "units";

export interface UsageLog {
  id: string;
  equipmentId: string;
  employeeId: string;
  date: string;
  usageType: UsageType;
  quantity: number;
  notes: string;
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  equipmentId: string;
  reportedBy: string;
  dateReported: string;
  category: MaintenanceCategory;
  problemDescription: string;
  priority: Priority;
  status: TicketStatus;
  resolutionNotes: string;
  estimatedDowntime: string;
  assignedEmployeeIds: string[];
}
