import { ChatView } from "@/app/chat/chat-view";
import React from "react";

const FALLBACK_PROMPT =
  "I need an ergonomic chair under $300 that's good for back pain.";

export default function ChatPage({
  searchParams,
}: {
  searchParams?: Promise<{ prompt?: string; mode?: string }>;
}) {
  const resolvedParams = searchParams ? React.use(searchParams) : undefined;
  const prompt =
    typeof resolvedParams?.prompt === "string" && resolvedParams.prompt.trim()
      ? resolvedParams.prompt.trim()
      : FALLBACK_PROMPT;

  return <ChatView initialPrompt={prompt} />;
}
