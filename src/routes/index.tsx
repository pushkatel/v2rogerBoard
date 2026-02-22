import { createFileRoute } from '@tanstack/react-router'
import { Title, Text, Stack } from '@mantine/core'

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
