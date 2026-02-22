import { Stack,Text, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <Stack>
      <Title>Home</Title>
      <Text>Welcome to the app. Use the nav above to browse pages.</Text>
    </Stack>
  )
}
