import { inngest } from "@/inngest/client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "app/hello.world" },
  async ({ event }) => {
    return { message: `Hello ${event.data?.name ?? "world"}!` };
  },
);

export const functions = [helloWorld];
