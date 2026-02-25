import { createFileRoute } from "@tanstack/react-router";

import { Dashboard } from "@/components/pages/dashboard/Dashboard";

export const Route = createFileRoute("/")({
  component: Dashboard,
});
