import { AppShell, Button,Group, MantineProvider } from '@mantine/core'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <MantineProvider>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md">
            <Button variant="subtle" component={Link} to="/">
              Home
            </Button>
            <Button variant="subtle" component={Link} to="/pages/$id" params={{ id: '1' }}>
              Page 1
            </Button>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}
