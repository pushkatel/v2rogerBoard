import { createFileRoute } from "@tanstack/react-router";

import { Machines } from "../components/pages/machines/Machines";

export const Route = createFileRoute("/machines")({
  component: Machines,
});
