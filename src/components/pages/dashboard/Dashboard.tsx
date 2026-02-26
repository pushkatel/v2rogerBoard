import { Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";

import { useAppContext } from "@/data/AppContext";

export const Dashboard = () => {
  const { equipment, employees } = useAppContext();

  const operational = equipment.filter((e) => e.status === "operational").length;
  const maintenance = equipment.filter((e) => e.status === "maintenance").length;
  const offline = equipment.filter((e) => e.status === "offline").length;

  return (
    <Stack>
      <Title order={2}>Dashboard</Title>
      <SimpleGrid cols={3}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Equipment</Title>
          <Group mt="sm" gap="xl">
            <Text>
              <Text span fw={700} c="green">{operational}</Text> operational
            </Text>
            <Text>
              <Text span fw={700} c="yellow">{maintenance}</Text> maintenance
            </Text>
            <Text>
              <Text span fw={700} c="red">{offline}</Text> offline
            </Text>
          </Group>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Employees</Title>
          <Text mt="sm">
            <Text span fw={700}>{employees.length}</Text> total
          </Text>
        </Card>
      </SimpleGrid>
    </Stack>
  );
};
