import { createFileRoute } from "@tanstack/react-router";

import { Admin } from "@/components/pages/admin/Admin";

export const Route = createFileRoute("/admin")({
  component: Admin,
});
