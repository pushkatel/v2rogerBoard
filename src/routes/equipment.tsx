import { createFileRoute } from "@tanstack/react-router";

import { Equipment } from "@/components/pages/equipment/Equipment";

export const Route = createFileRoute("/equipment")({
  component: Equipment,
});
