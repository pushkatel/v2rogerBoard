import { createFileRoute } from "@tanstack/react-router";

import { Tickets } from "../components/pages/tickets/Tickets";

export const Route = createFileRoute("/tickets")({
  component: Tickets,
});
