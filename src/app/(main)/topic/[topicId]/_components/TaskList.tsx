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
      <TableBody>
        {tasks.map((t) => (
          <TableRow key={Math.random()}>
            <TableCell>{t.name}</TableCell>
            <TableCell>
              <Button color={t.status == "PENDING" ? "danger" : "success"}>
                {t.status}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
