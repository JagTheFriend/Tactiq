"use server";

import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
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

export const getOpenRouterResponse = authActionClient
  .inputSchema(z.object({ topic: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    const { text } = await generateText({
      model: openrouter("google/gemma-3n-e4b-it:free"),
      prompt: `Generate a list of 5 concise, actionable tasks to learn about "${parsedInput.topic}". Return only the tasks, no numbering or formatting. Additionally, instead of backticks and or singly quotes, always use double quotes.`,
    });

    return text.trim().split("\n");
  });

export const getTasks = authActionClient
  .inputSchema(
    z.object({
      topicId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    return await ctx.db.task.findMany({
      where: {
        topicId: parsedInput.topicId,
      },
    });
  });
