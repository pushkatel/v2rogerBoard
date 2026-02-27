import { Stack, Tabs, Title } from "@mantine/core";

import { ContractsTab } from "./ContractsTab";
import { EquipmentTab } from "./EquipmentTab";
import { MaintenanceTab } from "./MaintenanceTab";
import { UsageLogTab } from "./UsageLogTab";

export const Equipment = () => {
  return (
    <Stack>
      <Title order={2}>Equipment</Title>
      <Tabs defaultValue="equipment">
        <Tabs.List>
          <Tabs.Tab value="equipment">Equipment</Tabs.Tab>
          <Tabs.Tab value="maintenance">Maintenance</Tabs.Tab>
          <Tabs.Tab value="contracts">Contracts</Tabs.Tab>
          <Tabs.Tab value="usage-log">Usage Log</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="equipment" pt="md">
          <EquipmentTab />
        </Tabs.Panel>
        <Tabs.Panel value="maintenance" pt="md">
          <MaintenanceTab />
        </Tabs.Panel>
        <Tabs.Panel value="contracts" pt="md">
          <ContractsTab />
        </Tabs.Panel>
        <Tabs.Panel value="usage-log" pt="md">
          <UsageLogTab />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
