"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { Task } from "@prisma/client";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      {tasks.length != 0 ? (
        <TableBody>
          {tasks.map((t) => (
            <TableRow
              key={t.id}
              className={`cursor-pointer font-semibold
                hover:scale-95 hover:bg-gray-100 transition
                ${t.status === "DONE" ? "opacity-70" : "opacity-100"}`}
            >
              <TableCell>{t.name}</TableCell>
              <TableCell>
                <Button
                  color={t.status == "PENDING" ? "danger" : "success"}
                  size="sm"
                >
                  {t.status}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={"Add a task to get started"}>{[]}</TableBody>
      )}
    </Table>
  );
}
