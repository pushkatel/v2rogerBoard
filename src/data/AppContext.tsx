import { createContext, useContext, useState } from "react";

import type { Area, Department, Employee, Machine, Ticket } from "@/types";

import {
  seedAreas,
  seedDepartments,
  seedEmployees,
  seedMachines,
  seedTickets,
} from "./seed";

interface AppContextValue {
  tickets: Ticket[];
  machines: Machine[];
  employees: Employee[];
  departments: Department[];
  areas: Area[];
  addTicket: (ticket: Ticket) => void;
  updateTicket: (ticket: Ticket) => void;
  deleteTicket: (id: string) => void;
  addMachine: (machine: Machine) => void;
  updateMachine: (machine: Machine) => void;
  deleteMachine: (id: string) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  addDepartment: (department: Department) => void;
  updateDepartment: (department: Department) => void;
  deleteDepartment: (id: string) => void;
  addArea: (area: Area) => void;
  updateArea: (area: Area) => void;
  deleteArea: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(seedTickets);
  const [machines, setMachines] = useState<Machine[]>(seedMachines);
  const [employees, setEmployees] = useState<Employee[]>(seedEmployees);
  const [departments, setDepartments] = useState<Department[]>(seedDepartments);
  const [areas, setAreas] = useState<Area[]>(seedAreas);

  const addTicket = (ticket: Ticket) => setTickets((prev) => [...prev, ticket]);
  const updateTicket = (ticket: Ticket) =>
    setTickets((prev) => prev.map((t) => (t.id === ticket.id ? ticket : t)));
  const deleteTicket = (id: string) =>
    setTickets((prev) => prev.filter((t) => t.id !== id));

  const addMachine = (machine: Machine) => setMachines((prev) => [...prev, machine]);
  const updateMachine = (machine: Machine) =>
    setMachines((prev) => prev.map((m) => (m.id === machine.id ? machine : m)));
  const deleteMachine = (id: string) =>
    setMachines((prev) => prev.filter((m) => m.id !== id));

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

  return (
    <AppContext.Provider
      value={{
        tickets,
        machines,
        employees,
        departments,
        areas,
        addTicket,
        updateTicket,
        deleteTicket,
        addMachine,
        updateMachine,
        deleteMachine,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        addArea,
        updateArea,
        deleteArea,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
