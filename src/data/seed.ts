import type { Area, Department, Employee, Machine, Ticket } from "@/types";

export const seedDepartments: Department[] = [
  { id: "dept-1", name: "Engineering" },
  { id: "dept-2", name: "Maintenance" },
  { id: "dept-3", name: "Quality" },
  { id: "dept-4", name: "Operations" },
];

export const seedAreas: Area[] = [
  { id: "area-1", name: "Building A", departmentId: "dept-1" },
  { id: "area-2", name: "Building B", departmentId: "dept-2" },
  { id: "area-3", name: "Building C", departmentId: "dept-3" },
  { id: "area-4", name: "Warehouse", departmentId: "dept-4" },
];

export const seedEmployees: Employee[] = [
  {
    id: "emp-1",
    name: "Alice Johnson",
    role: "Lead Engineer",
    departmentId: "dept-1",
    email: "alice@factory.com",
    phone: "555-0101",
  },
  {
    id: "emp-2",
    name: "Bob Martinez",
    role: "Maintenance Tech",
    departmentId: "dept-2",
    email: "bob@factory.com",
    phone: "555-0102",
  },
  {
    id: "emp-3",
    name: "Carol Chen",
    role: "Quality Inspector",
    departmentId: "dept-3",
    email: "carol@factory.com",
    phone: "555-0103",
  },
  {
    id: "emp-4",
    name: "Dan Wilson",
    role: "Operations Manager",
    departmentId: "dept-4",
    email: "dan@factory.com",
    phone: "555-0104",
  },
];

export const seedMachines: Machine[] = [
  {
    id: "mach-1",
    name: "CNC Mill #1",
    category: "CNC",
    areaId: "area-1",
    status: "operational",
  },
  {
    id: "mach-2",
    name: "Hydraulic Press #3",
    category: "Press",
    areaId: "area-2",
    status: "maintenance",
  },
  {
    id: "mach-3",
    name: "Conveyor Line 7",
    category: "Conveyor",
    areaId: "area-1",
    status: "operational",
  },
  {
    id: "mach-4",
    name: "Welding Robot R2",
    category: "Robotics",
    areaId: "area-3",
    status: "operational",
  },
  {
    id: "mach-5",
    name: "Packaging Unit P1",
    category: "Packaging",
    areaId: "area-2",
    status: "offline",
  },
];

export const seedTickets: Ticket[] = [
  {
    id: "tick-1",
    title: "CNC Mill spindle vibration",
    description: "Unusual vibration detected during high-speed milling operations. Needs inspection.",
    type: "engineering",
    status: "open",
    priority: "high",
    assignedEmployeeId: "emp-1",
    relatedMachineId: "mach-1",
    createdAt: "2026-02-20",
  },
  {
    id: "tick-2",
    title: "Hydraulic press scheduled maintenance",
    description: "Quarterly maintenance due. Replace seals and check hydraulic fluid levels.",
    type: "engineering",
    status: "in-progress",
    priority: "medium",
    assignedEmployeeId: "emp-2",
    relatedMachineId: "mach-2",
    createdAt: "2026-02-18",
  },
  {
    id: "tick-3",
    title: "Customer complaint: packaging defects",
    description: "Customer reported damaged packaging on last shipment batch #4421.",
    type: "customer",
    status: "open",
    priority: "high",
    assignedEmployeeId: "emp-3",
    relatedMachineId: "mach-5",
    createdAt: "2026-02-21",
  },
  {
    id: "tick-4",
    title: "Conveyor belt alignment check",
    description: "Routine alignment check after belt replacement last week.",
    type: "engineering",
    status: "closed",
    priority: "low",
    assignedEmployeeId: "emp-2",
    relatedMachineId: "mach-3",
    createdAt: "2026-02-15",
  },
  {
    id: "tick-5",
    title: "Customer request: production timeline",
    description: "Customer asking for updated delivery timeline on order #8832.",
    type: "customer",
    status: "open",
    priority: "medium",
    assignedEmployeeId: null,
    relatedMachineId: null,
    createdAt: "2026-02-22",
  },
];
