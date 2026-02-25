import { AppShell, Button, Group, MantineProvider, Title } from "@mantine/core";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import { AppProvider } from "@/data/AppContext";

const RootLayout = () => {
  return (
    <MantineProvider>
      <AppProvider>
        <AppShell header={{ height: 60 }} padding="md">
          <AppShell.Header>
            <Group h="100%" px="md">
              <Title order={3}>RogerBoard</Title>
              <Group ml="xl">
                <Link to="/">
                  <Button variant="subtle">Dashboard</Button>
                </Link>
                <Link to="/tickets">
                  <Button variant="subtle">Tickets</Button>
                </Link>
                <Link to="/machines">
                  <Button variant="subtle">Machines</Button>
                </Link>
                <Link to="/admin">
                  <Button variant="subtle">Admin</Button>
                </Link>
              </Group>
            </Group>
          </AppShell.Header>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
        </AppShell>
      </AppProvider>
    </MantineProvider>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
