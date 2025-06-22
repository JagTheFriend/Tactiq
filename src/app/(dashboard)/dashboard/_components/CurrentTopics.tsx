"use client";

import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { type Topic } from "@prisma/client";
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
        <Card
          key={index + Math.random()}
          className="max-w-[250px] aspect-square bg-gray-100"
        >
          <CardBody className="flex justify-center items-center">
            <button className="cursor-pointer shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              {topic.name}
            </button>
          </CardBody>
          <CardFooter className="cursor-default">
            <p>Last Edited: {topic.updatedAt.toLocaleDateString("en-GB")}</p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
