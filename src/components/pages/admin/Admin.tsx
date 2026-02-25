import { Stack, Tabs, Title } from "@mantine/core";

import { DepartmentsTab } from "./DepartmentsTab";
import { EmployeesTab } from "./EmployeesTab";

export const Admin = () => {
  return (
    <Stack>
      <Title order={2}>Admin</Title>
      <Tabs defaultValue="departments">
        <Tabs.List>
          <Tabs.Tab value="departments">Departments</Tabs.Tab>
          <Tabs.Tab value="employees">Employees</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="departments" pt="md">
          <DepartmentsTab />
        </Tabs.Panel>
        <Tabs.Panel value="employees" pt="md">
          <EmployeesTab />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
