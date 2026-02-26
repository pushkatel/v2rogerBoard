import {
  Card,
  Group,
  RingProgress,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconTool } from "@tabler/icons-react";

import { useAppContext } from "@/data/AppContext";
import type { EquipmentStatus } from "@/types";
import { equipmentStatusColor, equipmentStatusOptions } from "@/utils";

export const EquipmentCard = () => {
  const { equipment } = useAppContext();

  const byStatus: Record<EquipmentStatus, number> = {
    operational: equipment.filter((e) => e.status === "operational").length,
    maintenance: equipment.filter((e) => e.status === "maintenance").length,
    offline: equipment.filter((e) => e.status === "offline").length,
  };

  const ringSections = () => {
    const total = equipment.length;
    if (total === 0) return [];
    return (Object.entries(byStatus) as [EquipmentStatus, number][])
      .filter(([, v]) => v > 0)
      .map(([key, v]) => ({
        value: (v / total) * 100,
        color: `var(--mantine-color-${equipmentStatusColor[key]}-6)`,
      }));
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Group gap="sm">
          <ThemeIcon size="lg" radius="md" variant="light" color="teal">
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
          sections={ringSections()}
          label={
            <Text ta="center" fw={700} size="lg">
              {equipment.length}
            </Text>
          }
        />
      </Group>

      <Group gap="lg" justify="center">
        {equipmentStatusOptions.map(({ value, label }) => (
          <Group key={value} gap={6}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: `var(--mantine-color-${equipmentStatusColor[value]}-6)`,
              }}
            />
            <Text size="sm">
              <Text span fw={700} c={equipmentStatusColor[value]}>
                {byStatus[value]}
              </Text>{" "}
              {label}
            </Text>
          </Group>
        ))}
      </Group>
    </Card>
  );
};
