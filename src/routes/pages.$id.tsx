import { Stack, Text, Title } from "@mantine/core";
import { createFileRoute, useParams } from "@tanstack/react-router";

const PageDetail = () => {
  const { id } = useParams({ from: "/pages/$id" });

  return (
    <Stack>
      <Title>Page {id}</Title>
      <Text>This page was loaded with id: {id}</Text>
    </Stack>
  );
};

export const Route = createFileRoute("/pages/$id")({
  component: PageDetail,
});
