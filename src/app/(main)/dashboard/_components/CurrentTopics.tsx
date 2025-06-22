"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { type Topic } from "@prisma/client";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTopics } from "./action";

export default function CurrentTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data, serverError } = await getTopics();
      setIsLoading(false);

      if (serverError) {
        return setIsError(true);
      }
      setTopics(data ?? []);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex w-32 items-center justify-center">
          <Button isLoading color="primary">
            Loading
          </Button>
        </div>
      )}

      {isError && (
        <div className="flex w-32 items-center justify-center">
          <Button disabled color="danger">
            An Error Occurred
          </Button>
        </div>
      )}

      {topics.map((topic, index) => (
        <motion.div
          layout
          key={topic.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              key={index + Math.random()}
              className="max-w-[250px] aspect-square bg-gray-100 hover:border-slate-900"
            >
              <CardBody className="flex justify-center items-center">
                <Link
                  className="cursor-pointer px-6 py-2 bg-transparent border-1 border-gray-800 text-black rounded-lg font-medium transform hover:-translate-y-1 transition duration-400"
                  href={`/topic/${topic.id}`}
                  prefetch
                >
                  {topic.name}
                </Link>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
