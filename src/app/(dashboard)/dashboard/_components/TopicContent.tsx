"use client";

import type { Topic } from "@prisma/client";

export default function TopicContent({ topic }: { topic: Topic }) {
  return (
    <>
      <button className="cursor-pointer shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
        {topic.name}
      </button>
    </>
  );
}
