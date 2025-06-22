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
