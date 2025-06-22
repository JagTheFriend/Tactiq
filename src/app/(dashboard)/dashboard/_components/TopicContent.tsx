"use client";

import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import type { Task, Topic } from "@prisma/client";
import { useEffect, useState } from "react";
import { deleteTopic, getTasks } from "./action";

export default function TopicContent({ topic }: { topic: Topic }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        className="cursor-pointer px-6 py-2 bg-transparent border-1 border-gray-800 text-black rounded-lg font-medium transform hover:-translate-y-1 transition duration-400"
        onClick={() => onOpen()}
      >
        {topic.name}
      </button>
      <TopicModal topic={topic} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

function TopicModal({
  topic,
  isOpen,
  onClose,
}: {
  topic: Topic;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      setIsLoading(true);
      const { data, serverError } = await getTasks({ topicId: topic.id });
      setIsLoading(false);

      if (serverError) {
        return setIsError(true);
      }
      setTasks(data ?? []);
    };
    fetchData();
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} size="md" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row font-normal gap-1">
                Current Topic: <span className="font-medium">{topic.name}</span>
              </ModalHeader>
              <ModalBody>
                {isLoading && !isError ? (
                  <Button isLoading>Loading</Button>
                ) : (
                  <TaskTable tasks={tasks} />
                )}
                {isError && (
                  <Button variant="shadow" color="danger">
                    An Error Occurred
                  </Button>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={async () => {
                    setIsLoading(true);
                    const { serverError } = await deleteTopic({
                      topicId: topic.id,
                    });
                    setIsLoading(false);
                    if (serverError) {
                      return addToast({
                        title: "Unable to delete topic.",
                        description: "Try again later",
                        color: "danger",
                      });
                    }
                    addToast({
                      title: "Deleted topic!",
                      color: "success",
                    });
                    location.reload();
                    onClose();
                  }}
                >
                  Delete Topic
                </Button>
                <Button color="success" variant="ghost" onPress={onClose}>
                  Add Task
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <Table aria-label="Task list">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      {tasks.length > 0 ? (
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index + Math.random()}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={"No tasks to display."}>{[]}</TableBody>
      )}
    </Table>
  );
}
