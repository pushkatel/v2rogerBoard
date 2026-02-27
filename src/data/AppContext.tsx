import { createContext, useContext, useState } from "react";

import type { Area, Department, ECN, Employee, Equipment, ICAR, MaintenanceContract, MaintenanceTicket, UsageLog } from "@/types";

import {
  seedAreas,
  seedDepartments,
  seedECNs,
  seedEmployees,
  seedEquipment,
  seedICARs,
  seedMaintenanceContracts,
  seedMaintenanceTickets,
  seedUsageLogs,
} from "./seed";

interface AppContextValue {
  equipment: Equipment[];
  employees: Employee[];
  departments: Department[];
  areas: Area[];
  addEquipment: (item: Equipment) => void;
  updateEquipment: (item: Equipment) => void;
  deleteEquipment: (id: string) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  addDepartment: (department: Department) => void;
  updateDepartment: (department: Department) => void;
  deleteDepartment: (id: string) => void;
  addArea: (area: Area) => void;
  updateArea: (area: Area) => void;
  deleteArea: (id: string) => void;
  ecns: ECN[];
  addECN: (ecn: ECN) => void;
  updateECN: (ecn: ECN) => void;
  deleteECN: (id: string) => void;
  icars: ICAR[];
  addICAR: (icar: ICAR) => void;
  updateICAR: (icar: ICAR) => void;
  deleteICAR: (id: string) => void;
  maintenanceTickets: MaintenanceTicket[];
  addMaintenanceTicket: (ticket: MaintenanceTicket) => void;
  updateMaintenanceTicket: (ticket: MaintenanceTicket) => void;
  deleteMaintenanceTicket: (id: string) => void;
  maintenanceContracts: MaintenanceContract[];
  addMaintenanceContract: (contract: MaintenanceContract) => void;
  updateMaintenanceContract: (contract: MaintenanceContract) => void;
  deleteMaintenanceContract: (id: string) => void;
  usageLogs: UsageLog[];
  addUsageLog: (log: UsageLog) => void;
  updateUsageLog: (log: UsageLog) => void;
  deleteUsageLog: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [equipment, setEquipment] = useState<Equipment[]>(seedEquipment);
  const [employees, setEmployees] = useState<Employee[]>(seedEmployees);
  const [departments, setDepartments] = useState<Department[]>(seedDepartments);
  const [areas, setAreas] = useState<Area[]>(seedAreas);
  const [ecns, setECNs] = useState<ECN[]>(seedECNs);
  const [icars, setICARs] = useState<ICAR[]>(seedICARs);
  const [maintenanceTickets, setMaintenanceTickets] = useState<MaintenanceTicket[]>(seedMaintenanceTickets);
  const [maintenanceContracts, setMaintenanceContracts] = useState<MaintenanceContract[]>(seedMaintenanceContracts);
  const [usageLogs, setUsageLogs] = useState<UsageLog[]>(seedUsageLogs);

  const addEquipment = (item: Equipment) => setEquipment((prev) => [...prev, item]);
  const updateEquipment = (item: Equipment) =>
    setEquipment((prev) => prev.map((e) => (e.id === item.id ? item : e)));
  const deleteEquipment = (id: string) =>
    setEquipment((prev) => prev.filter((e) => e.id !== id));

  const addEmployee = (employee: Employee) => setEmployees((prev) => [...prev, employee]);
  const updateEmployee = (employee: Employee) =>
    setEmployees((prev) => prev.map((e) => (e.id === employee.id ? employee : e)));
  const deleteEmployee = (id: string) =>
    setEmployees((prev) => prev.filter((e) => e.id !== id));

  const addDepartment = (department: Department) =>
    setDepartments((prev) => [...prev, department]);
  const updateDepartment = (department: Department) =>
    setDepartments((prev) => prev.map((d) => (d.id === department.id ? department : d)));
  const deleteDepartment = (id: string) =>
    setDepartments((prev) => prev.filter((d) => d.id !== id));

  const addArea = (area: Area) => setAreas((prev) => [...prev, area]);
  const updateArea = (area: Area) =>
    setAreas((prev) => prev.map((a) => (a.id === area.id ? area : a)));
  const deleteArea = (id: string) => setAreas((prev) => prev.filter((a) => a.id !== id));

  const addECN = (ecn: ECN) => setECNs((prev) => [...prev, ecn]);
  const updateECN = (ecn: ECN) =>
    setECNs((prev) => prev.map((e) => (e.id === ecn.id ? ecn : e)));
  const deleteECN = (id: string) => setECNs((prev) => prev.filter((e) => e.id !== id));

  const addICAR = (icar: ICAR) => setICARs((prev) => [...prev, icar]);
  const updateICAR = (icar: ICAR) =>
    setICARs((prev) => prev.map((i) => (i.id === icar.id ? icar : i)));
  const deleteICAR = (id: string) => setICARs((prev) => prev.filter((i) => i.id !== id));

  const addMaintenanceTicket = (ticket: MaintenanceTicket) =>
    setMaintenanceTickets((prev) => [...prev, ticket]);
  const updateMaintenanceTicket = (ticket: MaintenanceTicket) =>
    setMaintenanceTickets((prev) => prev.map((t) => (t.id === ticket.id ? ticket : t)));
  const deleteMaintenanceTicket = (id: string) =>
    setMaintenanceTickets((prev) => prev.filter((t) => t.id !== id));

  const addMaintenanceContract = (contract: MaintenanceContract) =>
    setMaintenanceContracts((prev) => [...prev, contract]);
  const updateMaintenanceContract = (contract: MaintenanceContract) =>
    setMaintenanceContracts((prev) => prev.map((c) => (c.id === contract.id ? contract : c)));
  const deleteMaintenanceContract = (id: string) =>
    setMaintenanceContracts((prev) => prev.filter((c) => c.id !== id));

  const addUsageLog = (log: UsageLog) =>
    setUsageLogs((prev) => [...prev, log]);
  const updateUsageLog = (log: UsageLog) =>
    setUsageLogs((prev) => prev.map((l) => (l.id === log.id ? log : l)));
  const deleteUsageLog = (id: string) =>
    setUsageLogs((prev) => prev.filter((l) => l.id !== id));

  return (
    <AppContext.Provider
      value={{
        equipment,
        employees,
        departments,
        areas,
        addEquipment,
        updateEquipment,
        deleteEquipment,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        addArea,
        updateArea,
        deleteArea,
        ecns,
        addECN,
        updateECN,
        deleteECN,
        icars,
        addICAR,
        updateICAR,
        deleteICAR,
        maintenanceTickets,
        addMaintenanceTicket,
        updateMaintenanceTicket,
        deleteMaintenanceTicket,
        maintenanceContracts,
        addMaintenanceContract,
        updateMaintenanceContract,
        deleteMaintenanceContract,
        usageLogs,
        addUsageLog,
        updateUsageLog,
        deleteUsageLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
