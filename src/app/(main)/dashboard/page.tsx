"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import CurrentTopics from "./_components/CurrentTopics";
import NewTopicCard from "./_components/NewTopic";

export default function Dashboard() {
  return (
    <section className="flex flex-col gap-4">
      <Welcome />
      <div className="flex flex-col items-center md:items-start">
        <Content />
      </div>
    </section>
  );
}

function Welcome() {
  const { user } = useUser();

  return (
    <section className="text-3xl underline cursor-default">
      Welcome <span className="font-semibold">{user?.username}!</span>
    </section>
  );
}

function Content() {
  return (
    <motion.div
      layout="position"
      className="grid grid-cols-1 md:grid-cols-3 md:w-full sm:grid-cols-2 gap-4 gap-y-10"
    >
      <NewTopicCard />
      <CurrentTopics />
    </motion.div>
  );
}
