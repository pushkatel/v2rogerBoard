import {
  Card,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconFileDescription,
  IconTool,
} from "@tabler/icons-react";

import { useAppContext } from "@/data/AppContext";
import type { Priority, TicketStatus } from "@/types";
import {
  equipmentStatusColor,
  priorityColor,
  statusColor,
} from "@/utils";

const statusLabels: Record<TicketStatus, string> = {
  draft: "Draft",
  open: "Open",
  "in-review": "In Review",
  approved: "Approved",
  closed: "Closed",
};

const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const Dashboard = () => {
  const { equipment, ecns, icars } = useAppContext();

  const ecnsByStatus: Record<TicketStatus, number> = {
    draft: ecns.filter((e) => e.status === "draft").length,
    open: ecns.filter((e) => e.status === "open").length,
    "in-review": ecns.filter((e) => e.status === "in-review").length,
    approved: ecns.filter((e) => e.status === "approved").length,
    closed: ecns.filter((e) => e.status === "closed").length,
  };
  const ecnsByPriority: Record<Priority, number> = {
    critical: ecns.filter((e) => e.priority === "critical").length,
    high: ecns.filter((e) => e.priority === "high").length,
    medium: ecns.filter((e) => e.priority === "medium").length,
    low: ecns.filter((e) => e.priority === "low").length,
  };

  const icarsByStatus: Record<TicketStatus, number> = {
    draft: icars.filter((i) => i.status === "draft").length,
    open: icars.filter((i) => i.status === "open").length,
    "in-review": icars.filter((i) => i.status === "in-review").length,
    approved: icars.filter((i) => i.status === "approved").length,
    closed: icars.filter((i) => i.status === "closed").length,
  };
  const icarsByPriority: Record<Priority, number> = {
    critical: icars.filter((i) => i.priority === "critical").length,
    high: icars.filter((i) => i.priority === "high").length,
    medium: icars.filter((i) => i.priority === "medium").length,
    low: icars.filter((i) => i.priority === "low").length,
  };

  const equipmentByStatus = {
    operational: equipment.filter((e) => e.status === "operational").length,
    maintenance: equipment.filter((e) => e.status === "maintenance").length,
    offline: equipment.filter((e) => e.status === "offline").length,
  };

  const statusRingSections = (counts: Record<TicketStatus, number>) => {
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (total === 0) return [];
    return (Object.entries(counts) as [TicketStatus, number][])
      .filter(([, v]) => v > 0)
      .map(([key, v]) => ({
        value: (v / total) * 100,
        color: `var(--mantine-color-${statusColor[key]}-6)`,
      }));
  };

  const ticketCard = (
    title: string,
    icon: React.ReactNode,
    iconColor: string,
    total: number,
    byStatus: Record<TicketStatus, number>,
    byPriority: Record<Priority, number>,
  ) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Group gap="sm">
          <ThemeIcon size="lg" radius="md" variant="light" color={iconColor}>
            {icon}
          </ThemeIcon>
          <Title order={3}>{title}</Title>
        </Group>
        <Text fw={700} size="xl">
          {total}
        </Text>
      </Group>

      <Group justify="center" mb="md">
        <RingProgress
          size={130}
          thickness={14}
          roundCaps
          sections={statusRingSections(byStatus)}
          label={
            <Text ta="center" fw={700} size="lg">
              {total}
            </Text>
          }
        />
      </Group>

      <Group gap="lg" justify="center" mb="md">
        {(Object.entries(byStatus) as [TicketStatus, number][]).map(
          ([key, count]) => (
            <Group key={key} gap={6}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: `var(--mantine-color-${statusColor[key]}-6)`,
                }}
              />
              <Text size="sm">
                <Text span fw={700} c={statusColor[key]}>
                  {count}
                </Text>{" "}
                {statusLabels[key]}
              </Text>
            </Group>
          ),
        )}
      </Group>

      <Text fw={600} size="sm" c="dimmed" mb={8}>
        Priority
      </Text>
      <SimpleGrid cols={4}>
        {(Object.entries(byPriority) as [Priority, number][]).map(
          ([key, count]) => (
            <Paper key={key} p="xs" radius="md" withBorder>
              <Stack align="center" gap={4}>
                <ThemeIcon
                  size="sm"
                  radius="xl"
                  variant="filled"
                  color={priorityColor[key]}
                >
                  <Text size="xs" fw={700} c="white">
                    {count}
                  </Text>
                </ThemeIcon>
                <Text size="xs" tt="capitalize">
                  {priorityLabels[key]}
                </Text>
              </Stack>
            </Paper>
          ),
        )}
      </SimpleGrid>
    </Card>
  );

  const equipmentRingSections = () => {
    const total = equipment.length;
    if (total === 0) return [];
    return (
      Object.entries(equipmentByStatus) as [
        keyof typeof equipmentByStatus,
        number,
      ][]
    )
      .filter(([, v]) => v > 0)
      .map(([key, v]) => ({
        value: (v / total) * 100,
        color: `var(--mantine-color-${equipmentStatusColor[key]}-6)`,
      }));
  };

  const equipmentStatusLabels: Record<string, string> = {
    operational: "Operational",
    maintenance: "Maintenance",
    offline: "Offline",
  };

  return (
    <Stack>
      <Title order={2}>Dashboard</Title>
      <SimpleGrid cols={2}>
        {ticketCard(
          "ECNs",
          <IconFileDescription size={20} />,
          "blue",
          ecns.length,
          ecnsByStatus,
          ecnsByPriority,
        )}
        {ticketCard(
          "ICARs",
          <IconAlertTriangle size={20} />,
          "orange",
          icars.length,
          icarsByStatus,
          icarsByPriority,
        )}

        {/* Equipment Card */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="sm">
              <ThemeIcon
                size="lg"
                radius="md"
                variant="light"
                color="teal"
              >
                <IconTool size={20} />
              </ThemeIcon>
              <Title order={3}>Equipment</Title>
            </Group>
            <Text fw={700} size="xl">
              {equipment.length}
            </Text>
          </Group>

          <Group justify="center" mb="md">
            <RingProgress
              size={130}
              thickness={14}
              roundCaps
              sections={equipmentRingSections()}
              label={
                <Text ta="center" fw={700} size="lg">
                  {equipment.length}
                </Text>
              }
            />
          </Group>

          <Group gap="lg" justify="center">
            {(
              Object.entries(equipmentByStatus) as [
                keyof typeof equipmentByStatus,
                number,
              ][]
            ).map(([key, count]) => (
              <Group key={key} gap={6}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: `var(--mantine-color-${equipmentStatusColor[key]}-6)`,
                  }}
                />
                <Text size="sm">
                  <Text span fw={700} c={equipmentStatusColor[key]}>
                    {count}
                  </Text>{" "}
                  {equipmentStatusLabels[key]}
                </Text>
              </Group>
            ))}
          </Group>
        </Card>

      </SimpleGrid>
    </Stack>
  );
};
