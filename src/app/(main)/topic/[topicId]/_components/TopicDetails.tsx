"use client";

import { motion } from "motion/react";

export default function TopicDetails({ topicName }: { topicName: string }) {
  return (
    <motion.section
      className="text-3xl cursor-default"
      initial={{ x: "-100%" }}
      whileInView={{ x: "0%" }}
      transition={{ duration: 1 }}
    >
      Currently Viewing:{" "}
      <span className="font-semibold underline">{topicName}</span>
    </motion.section>
  );
}
