import { createFileRoute } from "@tanstack/react-router";

import { Quality } from "@/components/pages/quality/Quality";

export const Route = createFileRoute("/quality")({
  component: Quality,
});
