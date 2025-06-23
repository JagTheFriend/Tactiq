import TaskList from "./_components/TaskList";
import TopicDetails from "./_components/TopicDetails";
import { getTopic } from "./_components/action";

export default async function TopicContent({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const { serverError, data } = await getTopic({ id: topicId });

  if (serverError) {
    return <div>An Error Occurred!</div>;
  }

  return (
    <section className="flex flex-col gap-4">
      {data && (
        <>
          <TopicDetails topic={data} />
          <TaskList tasks={data.task} />
        </>
      )}
    </section>
  );
}
