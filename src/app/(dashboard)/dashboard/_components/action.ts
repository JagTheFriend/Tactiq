"use server";

import { authActionClient } from "~/server/safe-action";

export const getTopics = authActionClient.action(async ({ ctx }) => {
  return ctx.projects;
});
