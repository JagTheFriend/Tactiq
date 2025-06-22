import OpenAI from "openai";
import { env } from "~/env";

const createOpenAIClient = () =>
  new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: env.OPENAI_API,
  });

const globalForPrisma = globalThis as unknown as {
  openAI: ReturnType<typeof createOpenAIClient> | undefined;
};

export const openAI = globalForPrisma.openAI ?? createOpenAIClient();

if (env.NODE_ENV !== "production") globalForPrisma.openAI = openAI;
