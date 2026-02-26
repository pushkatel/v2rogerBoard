import { SimpleGrid, Stack, Title } from "@mantine/core";
import { IconAlertTriangle, IconFileDescription } from "@tabler/icons-react";

import { useAppContext } from "@/data/AppContext";
import type { Priority, TicketStatus } from "@/types";

import { EquipmentCard } from "./EquipmentCard";
import { TicketCard } from "./TicketCard";

export const Dashboard = () => {
  const { ecns, icars } = useAppContext();

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

  return (
    <Stack>
      <Title order={2}>Dashboard</Title>
      <SimpleGrid cols={2}>
        <TicketCard
          title="ECNs"
          icon={<IconFileDescription size={20} />}
          iconColor="blue"
          total={ecns.length}
          byStatus={ecnsByStatus}
          byPriority={ecnsByPriority}
        />
        <TicketCard
          title="ICARs"
          icon={<IconAlertTriangle size={20} />}
          iconColor="orange"
          total={icars.length}
          byStatus={icarsByStatus}
          byPriority={icarsByPriority}
        />
        <EquipmentCard />
      </SimpleGrid>
    </Stack>
  );
};
