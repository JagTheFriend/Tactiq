"use client";

import {
  addToast,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
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
import { TaskStatus, type Task } from "@prisma/client";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { deleteTask, updateTask } from "./action";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <motion.section
      initial={{ opacity: "0%" }}
      whileInView={{ opacity: "100%" }}
      transition={{ duration: 0.9 }}
    >
      <Table>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        {tasks.length != 0 ? (
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                className={`cursor-pointer font-semibold
                hover:scale-95 hover:bg-gray-100 transition
                ${task.status === "DONE" ? "opacity-70" : "opacity-100"}`}
                onClick={() => {
                  setSelectedTask(task);
                  onOpen();
                }}
              >
                <TableCell>{task.name}</TableCell>
                <TableCell>
                  <Button
                    color={task.status == "PENDING" ? "danger" : "success"}
                    size="sm"
                    onPress={() => {
                      setSelectedTask(task);
                      onOpen();
                    }}
                  >
                    {task.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"Add a task to get started"}>{[]}</TableBody>
        )}
      </Table>
      {selectedTask && (
        <EditTaskButton task={selectedTask} onClose={onClose} isOpen={isOpen} />
      )}
    </motion.section>
  );
}

function EditTaskButton({
  task,
  onClose,
  isOpen,
}: {
  task: Task;
  onClose: any;
  isOpen: boolean;
}) {
  const [taskContent, setTaskContent] = useState(task.name);
  const [selectedKeys, setSelectedKeys] = useState(new Set([task.status]));
  const selectedValue = useMemo<TaskStatus>(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, "") as TaskStatus,
    [selectedKeys]
  );

  return (
    <>
      <Modal isOpen={isOpen} size="md" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editing Task
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Edit Task"
                  type="text"
                  defaultValue={task.name}
                  onInput={(e) => setTaskContent(e.currentTarget.value.trim())}
                />
                <Divider />
                <div className="flex flex-row gap-2 items-center">
                  <p>Status:</p>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        size="sm"
                        className="capitalize"
                        variant="bordered"
                      >
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      disallowEmptySelection
                      selectedKeys={selectedKeys}
                      selectionMode="single"
                      variant="solid"
                      // @ts-ignore
                      onSelectionChange={setSelectedKeys}
                    >
                      <DropdownItem color="success" key="DONE">
                        DONE
                      </DropdownItem>
                      <DropdownItem color="danger" key="PENDING">
                        PENDING
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </ModalBody>
              <ModalFooter>
                <DeleteTaskButton taskId={task.id} onClose={onClose} />
                <EditTaskModalButton
                  onClose={onClose}
                  taskId={task.id}
                  name={taskContent}
                  status={selectedValue}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function DeleteTaskButton({
  taskId,
  onClose,
}: {
  taskId: string;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      color="danger"
      isDisabled={isLoading}
      isLoading={isLoading}
      variant="light"
      onPress={async () => {
        setIsLoading(true);
        const { serverError } = await deleteTask({ taskId });
        setIsLoading(false);

        if (serverError) {
          return addToast({
            title: "Unable to delete task",
            description: "Try again later",
            color: "danger",
          });
        }
        addToast({
          title: "Deleted Task",
          color: "success",
        });
        onClose();
      }}
    >
      Delete
    </Button>
  );
}

function EditTaskModalButton({
  taskId,
  name,
  status,
  onClose,
}: {
  taskId: string;
  name: string;
  status: TaskStatus;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      color="primary"
      isDisabled={isLoading || name.length == 0}
      isLoading={isLoading}
      onPress={async () => {
        setIsLoading(true);
        const { serverError } = await updateTask({
          taskId,
          name,
          status,
        });
        setIsLoading(false);

        if (serverError) {
          return addToast({
            title: "Unable to updated task",
            description: "Try again later",
            color: "danger",
          });
        }
        addToast({
          title: "Updated Task",
          color: "success",
        });
        onClose();
      }}
    >
      Save
    </Button>
  );
}
