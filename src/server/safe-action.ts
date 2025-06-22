import { auth } from "@clerk/nextjs/server";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { db } from "./db";

class ActionError extends Error {}

// Base client.
const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next }) => {
  // Attach the database instance to the context
  return next({
    ctx: { db },
  });
});

// Auth client defined by extending the base client
export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = await auth();
    if (!session) {
      throw new Error("Session not found!");
    }
    if (!session.userId) {
      throw new Error("User ID not found!");
    }
    const projects = await db.topic.findMany({
      where: {
        authorId: session.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return next({ ctx: { projects, session } });
  });
