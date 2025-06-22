"use client";

import type { Topic } from "@prisma/client";

export default function TopicContent({ topic }: { topic: Topic }) {
  return (
    <>
      <button className="cursor-pointer px-6 py-2 bg-transparent border-1 border-gray-800 text-black rounded-lg font-medium transform hover:-translate-y-1 transition duration-400">
        {topic.name}
      </button>
    </>
  );
}
