import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
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
        task: true,
      },
    });
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
