import { createFileRoute } from "@tanstack/react-router";

import { Customer } from "@/components/pages/customer/Customer";

export const Route = createFileRoute("/customer")({
  component: Customer,
});
