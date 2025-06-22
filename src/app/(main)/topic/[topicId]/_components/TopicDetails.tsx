"use client";

import { Button } from "@heroui/react";
import { motion } from "motion/react";

export default function TopicDetails({ topicName }: { topicName: string }) {
  return (
    <>
      <motion.section
        className="text-3xl cursor-default"
        initial={{ x: "-100%" }}
        whileInView={{ x: "0%" }}
        transition={{ duration: 1 }}
      >
        Currently Viewing:{" "}
        <span className="font-semibold underline">{topicName}</span>
      </motion.section>

      <motion.div
        initial={{ y: "-100%" }}
        whileInView={{ y: "0%" }}
        transition={{ duration: 1 }}
        className="flex flex-row gap-2"
      >
        <Button variant="bordered" color="primary">
          Edit
        </Button>
        <Button variant="ghost" color="success">
          Add Task
        </Button>
      </motion.div>
    </>
  );
}
