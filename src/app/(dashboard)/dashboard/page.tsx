"use client";

import { useUser } from "@clerk/nextjs";
import CurrentTopics from "./_components/CurrentTopics";
import NewTopicCard from "./_components/NewTopic";

export default function Dashboard() {
  return (
    <div className="p-5 flex flex-col gap-4">
      <Welcome />
      <Content />
    </div>
  );
}

function Welcome() {
  const { user } = useUser();

  return (
    <section className="text-2xl">
      Welcome <span className="font-semibold">{user?.username}!</span>
    </section>
  );
}

function Content() {
  return (
    <div className="grid grid-cols-3 gap-4 gap-y-10">
      <NewTopicCard />
      <CurrentTopics />
    </div>
  );
}
