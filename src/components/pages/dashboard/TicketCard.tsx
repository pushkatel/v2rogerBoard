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

import type { Priority, TicketStatus } from "@/types";
import {
  priorityColor,
  priorityOptions,
  statusColor,
  statusOptions,
} from "@/utils";

interface TicketCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  total: number;
  byStatus: Record<TicketStatus, number>;
  byPriority: Record<Priority, number>;
}

export const TicketCard = ({
  title,
  icon,
  iconColor,
  total,
  byStatus,
  byPriority,
}: TicketCardProps) => {
  const ringSections = () => {
    if (total === 0) return [];
    return (Object.entries(byStatus) as [TicketStatus, number][])
      .filter(([, v]) => v > 0)
      .map(([key, v]) => ({
        value: (v / total) * 100,
        color: `var(--mantine-color-${statusColor[key]}-6)`,
      }));
  };

  return (
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
          sections={ringSections()}
          label={
            <Text ta="center" fw={700} size="lg">
              {total}
            </Text>
          }
        />
      </Group>

      <Group gap="lg" justify="center" mb="md">
        {statusOptions.map(({ value, label }) => (
          <Group key={value} gap={6}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: `var(--mantine-color-${statusColor[value]}-6)`,
              }}
            />
            <Text size="sm">
              <Text span fw={700} c={statusColor[value]}>
                {byStatus[value]}
              </Text>{" "}
              {label}
            </Text>
          </Group>
        ))}
      </Group>

      <Text fw={600} size="sm" c="dimmed" mb={8}>
        Priority
      </Text>
      <SimpleGrid cols={4}>
        {priorityOptions.map(({ value, label }) => (
          <Paper key={value} p="xs" radius="md" withBorder>
            <Stack align="center" gap={4}>
              <ThemeIcon
                size="sm"
                radius="xl"
                variant="filled"
                color={priorityColor[value]}
              >
                <Text size="xs" fw={700} c="white">
                  {byPriority[value]}
                </Text>
              </ThemeIcon>
              <Text size="xs">{label}</Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Card>
  );
};
