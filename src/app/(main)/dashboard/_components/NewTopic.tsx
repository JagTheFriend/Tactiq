"use client";

import {
  addToast,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { motion } from "motion/react";
import { useState } from "react";
import { addTopic } from "./action";

export default function NewTopicCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
      <Card className="max-w-[250px] aspect-square bg-gray-50 border-2 border-dashed">
        <CardBody className="flex justify-center items-center">
          <button
            className="p-[3px] relative cursor-pointer"
            onClick={() => onOpen()}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Add a new Topic
            </div>
          </button>
        </CardBody>
      </Card>
      <NewTopicModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </motion.div>
  );
}

function NewTopicModal({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [topicName, setTopicName] = useState("");

  return (
    <Modal isOpen={isOpen} size={"md"} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add a new topic
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  label="Name"
                  size="sm"
                  type="text"
                  onInput={(e) => {
                    setTopicName(e.currentTarget.value.trim());
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="ghost"
                isLoading={isLoading}
                disabled={isLoading || topicName.length == 0}
                onPress={async () => {
                  setIsLoading(true);
                  const { serverError } = await addTopic({ topicName });
                  setIsLoading(false);
                  if (serverError) {
                    return addToast({
                      title: "Unable to add topic.",
                      description: "Check if it exists already!",
                      color: "danger",
                    });
                  }
                  addToast({
                    title: "Added topic!",
                    color: "success",
                  });
                  location.reload();
                  onClose();
                }}
              >
                {isLoading ? "Adding" : "Add"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
