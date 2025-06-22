"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardBody } from "@heroui/react";
import CurrentTopics from "./_components/CurrentTopics";

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
    <div className="grid grid-cols-4 gap-4">
      <NewTopicCard />
      <CurrentTopics />
    </div>
  );
}

function NewTopicCard() {
  return (
    <Card className="max-w-[250px] aspect-square bg-gray-200">
      <CardBody className="flex justify-center items-center">
        <button className="p-[3px] relative cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Create a new Topic
          </div>
        </button>
      </CardBody>
    </Card>
  );
}
