import { createFileRoute } from '@tanstack/react-router'
import { Title, Text, Stack } from '@mantine/core'

export const Route = createFileRoute('/pages/$id')({
  component: PageDetail,
})

function PageDetail() {
  const { id } = Route.useParams()

  return (
    <Stack>
      <Title>Page {id}</Title>
      <Text>This page was loaded with id: {id}</Text>
    </Stack>
  )
}
