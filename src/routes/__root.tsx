import { AppShell, Button,Group, MantineProvider } from '@mantine/core'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

const RootLayout = () => {
  return (
    <MantineProvider>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md">
            <Link to="/">
              <Button variant="subtle">Home</Button>
            </Link>
            <Link to="/pages/$id" params={{ id: '1' }}>
              <Button variant="subtle">Page 1</Button>
            </Link>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
