"use server";

import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authActionClient } from "~/server/safe-action";

export const getTopic = authActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const { id } = parsedInput;
    return await ctx.db.topic.findUnique({
      where: {
        id,
      },
      include: {
        task: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  });

export const deleteTopic = authActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db.topic.delete({
      where: {
        id: parsedInput.id,
      },
    });
    return revalidatePath("/dashboard");
  });

export const updateTopic = authActionClient
  .inputSchema(z.object({ id: z.string(), name: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db.topic.update({
      where: {
        id: parsedInput.id,
      },
      data: {
        name: parsedInput.name,
      },
    });
    return revalidatePath(`/topic/${parsedInput.id}`);
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

export const addTask = authActionClient
  .inputSchema(
    z.object({
      topicId: z.string(),
      task: z.array(z.object({ name: z.string() })),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db.task.createMany({
      data: parsedInput.task.map((t) => {
        return {
          name: t.name,
          topicId: parsedInput.topicId,
          authorId: ctx.session.userId,
        };
      }),
    });
    return revalidatePath(`/topic/${parsedInput.topicId}`);
  });
