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
                <Link to="/equipment">
                  <Button variant="subtle">Equipment</Button>
                </Link>
                <Link to="/quality">
                  <Button variant="subtle">Quality</Button>
                </Link>
                <Link to="/customer">
                  <Button variant="subtle">Customer</Button>
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
