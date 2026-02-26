import { Stack, Tabs, Title } from "@mantine/core";

import { EquipmentTab } from "./EquipmentTab";
import { MaintenanceTab } from "./MaintenanceTab";

export const Equipment = () => {
  return (
    <Stack>
      <Title order={2}>Equipment</Title>
      <Tabs defaultValue="equipment">
        <Tabs.List>
          <Tabs.Tab value="equipment">Equipment</Tabs.Tab>
          <Tabs.Tab value="maintenance">Maintenance</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="equipment" pt="md">
          <EquipmentTab />
        </Tabs.Panel>
        <Tabs.Panel value="maintenance" pt="md">
          <MaintenanceTab />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
