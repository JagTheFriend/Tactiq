export default async function TopicContent({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;

  return <>{topicId}</>;
}
