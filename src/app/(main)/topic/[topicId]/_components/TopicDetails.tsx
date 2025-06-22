"use client";

import {
  addToast,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import type { Topic } from "@prisma/client";
import { motion } from "motion/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  addTask,
  deleteTopic,
  getOpenRouterResponse,
  updateTopic,
} from "../action";

export default function TopicDetails({ topic }: { topic: Topic }) {
  return (
    <>
      <motion.section
        className="text-3xl cursor-default"
        initial={{ x: "-100%" }}
        whileInView={{ x: "0%" }}
        transition={{ duration: 1 }}
      >
        Currently Viewing:{" "}
        <span className="font-semibold underline">{topic.name}</span>
      </motion.section>

      <motion.div
        initial={{ y: "-100%" }}
        whileInView={{ y: "0%" }}
        transition={{ duration: 1 }}
        className="flex flex-row gap-2"
      >
        <EditTopicModal topic={topic} />
        <AddTaskModal topic={topic} />
      </motion.div>
    </>
  );
}

function EditTopicModal({ topic }: { topic: Topic }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTopic, setCurrentTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button variant="bordered" color="primary" onPress={() => onOpen()}>
        Edit
      </Button>
      <Modal isOpen={isOpen} size="md" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editing {topic.name}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Edit Topic Name"
                  type="text"
                  onInput={(e) => setCurrentTopic(e.currentTarget.value.trim())}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  disabled={isLoading}
                  onPress={async () => {
                    setIsLoading(true);
                    const { serverError } = await deleteTopic({ id: topic.id });
                    setIsLoading(false);

                    if (serverError) {
                      return addToast({
                        title: `Failed to deleted ${topic.name}`,
                        description: "Try again later!",
                        color: "danger",
                      });
                    }

                    addToast({
                      title: `Deleted ${topic.name}!`,
                      color: "success",
                    });
                    onClose();
                    redirect("/dashboard");
                  }}
                >
                  Delete
                </Button>
                <Button
                  color="primary"
                  disabled={isLoading || currentTopic.length == 0}
                  onPress={async () => {
                    setIsLoading(true);
                    const { serverError } = await updateTopic({
                      id: topic.id,
                      name: currentTopic,
                    });
                    setIsLoading(false);

                    if (serverError) {
                      return addToast({
                        title: "Failed to rename",
                        description: "Try again later!",
                        color: "danger",
                      });
                    }
                    addToast({
                      title: `Renamed ${topic.name} to ${currentTopic}!`,
                      color: "success",
                    });
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function AddTaskModal({ topic }: { topic: Topic }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTopic, setCurrentTopic] = useState("");
  const [searchedTopic] = useDebounce(currentTopic, 500);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (searchedTopic.length == 0) return;

    const fetchSearch = async () => {
      setIsSearching(true);
      const { serverError, data } = await getOpenRouterResponse({
        topic: searchedTopic,
      });
      if (serverError) {
        return addToast({
          title: "Failed to search",
          description: "Try again later!",
          color: "danger",
        });
      }
      setSearchResults(data ?? []);
      setIsSearching(false);
    };
    fetchSearch();
  }, [searchedTopic]);

  return (
    <>
      <Button variant="ghost" color="success" onPress={() => onOpen()}>
        Add Task
      </Button>
      <Modal isOpen={isOpen} size="md" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Task
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Search for a Topic"
                  type="text"
                  onInput={(e) => setCurrentTopic(e.currentTarget.value.trim())}
                />
                {isSearching && <Button isLoading>Searching</Button>}
                {searchResults.length > 0 && (
                  <CheckboxGroup label="Select tasks">
                    {searchResults.map((r) => (
                      <Checkbox
                        className="checkbox-search-result"
                        value={r}
                        key={Math.random()}
                      >
                        {r}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  disabled={isSaving}
                  onPress={() => {
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  disabled={isSaving}
                  isLoading={isSaving}
                  onPress={async () => {
                    setIsSaving(true);
                    const selectedTopics = document.querySelectorAll(
                      ".checkbox-search-result input:checked"
                    ) as NodeListOf<HTMLInputElement>;

                    const searchResults = Array.from(selectedTopics).map(
                      (r) => r.value
                    );

                    const { serverError } = await addTask({
                      topicId: topic.id,
                      task: searchResults.map((r) => ({ name: r })),
                    });
                    setIsSaving(false);

                    if (serverError) {
                      return addToast({
                        title: "Failed to add task",
                        description: "Try again later!",
                        color: "danger",
                      });
                    }
                    addToast({
                      title: `Added tasks!`,
                      color: "success",
                    });
                    onClose();
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
