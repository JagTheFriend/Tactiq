"use client";

import { Button } from "@heroui/react";
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
    </>
  );
}
