"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authActionClient } from "~/server/safe-action";

export const getTopics = authActionClient.action(async ({ ctx }) => {
  return ctx.projects;
});

export const addTopic = authActionClient
  .inputSchema(
    z.object({
      topicName: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db.topic.create({
      data: {
        name: parsedInput.topicName,
        authorId: ctx.session.userId,
      },
    });
    revalidatePath("/dashboard");
  });

export const deleteTopic = authActionClient
  .inputSchema(
    z.object({
      topicId: z.string(),
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    return await ctx.db.topic.delete({ where: { id: parsedInput.topicId } });
  });

export const getTasks = authActionClient
  .inputSchema(
    z.object({
      topicId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    console.log("heyy");
    return await ctx.db.task.findMany({
      where: {
        topicId: parsedInput.topicId,
      },
    });
  });
