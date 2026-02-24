import { Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";

import { useAppContext } from "../../../data/AppContext";

export const Dashboard = () => {
  const { tickets, machines, employees } = useAppContext();

  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter((t) => t.status === "in-progress").length;
  const operational = machines.filter((m) => m.status === "operational").length;
  const maintenance = machines.filter((m) => m.status === "maintenance").length;
  const offline = machines.filter((m) => m.status === "offline").length;

  return (
    <Stack>
      <Title order={2}>Dashboard</Title>
      <SimpleGrid cols={3}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Tickets</Title>
          <Group mt="sm" gap="xl">
            <Text>
              <Text span fw={700}>{openTickets}</Text> open
            </Text>
            <Text>
              <Text span fw={700}>{inProgressTickets}</Text> in progress
            </Text>
          </Group>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>Machines</Title>
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
