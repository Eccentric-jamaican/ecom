"use client";

import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";

const ASSISTANT_SUMMARY =
  "I found 3 highly-rated ergonomic chairs under $300 suitable for long hours and back support. Here are the top options based on recent reviews and price drops.";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatViewProps = {
  initialPrompt: string;
};

export function ChatView({ initialPrompt }: ChatViewProps) {
  const seedMessages = useMemo<ChatMessage[]>(
    () => [
      { id: "seed-user", role: "user", content: initialPrompt },
      { id: "seed-assistant", role: "assistant", content: ASSISTANT_SUMMARY },
    ],
    [initialPrompt]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = (message: PromptInputMessage) => {
    const text = message.text.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: nanoid(), role: "user", content: text },
      { id: nanoid(), role: "assistant", content: "Searching..." },
    ]);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#111417]">
      <aside className="hidden w-[280px] flex-col border-r border-[#f0f2f4] bg-white lg:flex">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 mb-6">
              <div
                className="size-10 overflow-hidden rounded-full bg-[#eef2f7]"
                role="img"
                aria-label="Profile picture of a user smiling"
              >
                <div
                  className="h-full w-full bg-center bg-cover bg-no-repeat"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1ayMApKYzl9hqd6hAGoYGwnDtOd2nOo3l-4OpA67l94iRDE_PT4qj2chXUIpyH86W6MchpyUAouWtL-EoI3d0mgIOYtAtmbPofepSPg1c45UUpdkgnrW4599HPjuqR5tswX9g4rDvfP-1HHtoxGgjK8pIJCSA85JdFXX4fmubVNhmF7JXJVOZzrqvz0KM-Lv0NWGkYIF4IPsw-W88n5xkb38mMsasBZcbHSAFxfEt-FshPzCSqOYGPy0Z1g-o8nTaUrYUxN50fq8")',
                  }}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-[#111417] text-base font-medium leading-normal">
                  ShopMate
                </h1>
                <p className="text-[#647587] text-sm font-normal leading-normal">
                  Welcome back
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f0f2f4] transition-colors"
                href="/"
              >
                <span className="material-symbols-outlined text-[#111417]">
                  home
                </span>
                <p className="text-[#111417] text-sm font-medium leading-normal">
                  Home
                </p>
              </a>
              <a
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f0f2f4] transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[#111417]">
                  shopping_bag
                </span>
                <p className="text-[#111417] text-sm font-medium leading-normal">
                  Shop
                </p>
              </a>
              <a
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f0f2f4] transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[#111417]">
                  tag
                </span>
                <p className="text-[#111417] text-sm font-medium leading-normal">
                  Deals
                </p>
              </a>
              <a
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 transition-colors"
                href="/chat"
              >
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
                <p className="text-[#111417] text-sm font-bold leading-normal">
                  AI Assistant
                </p>
              </a>
              <a
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f0f2f4] transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[#111417]">
                  person
                </span>
                <p className="text-[#111417] text-sm font-medium leading-normal">
                  Profile
                </p>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f0f2f4] cursor-pointer">
            <span className="material-symbols-outlined text-[#647587]">
              settings
            </span>
            <p className="text-[#647587] text-sm font-medium leading-normal">
              Settings
            </p>
          </div>
        </div>
      </aside>

      <main className="flex flex-1 flex-col h-full min-h-0 bg-white relative">
        <header className="flex flex-shrink-0 items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-6 py-4 bg-white z-10">
          <div className="flex items-center gap-4 text-[#111417]">
            <div className="size-6 text-primary flex items-center justify-center">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "28px", fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
            </div>
            <h2 className="text-[#111417] text-xl font-bold leading-tight tracking-[-0.015em]">
              AI Shopping Assistant
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-9 w-9 bg-[#f0f2f4] text-[#111417] hover:bg-[#e2e4e6] transition-colors" type="button">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                picture_in_picture
              </span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-9 w-9 bg-[#f0f2f4] text-[#111417] hover:bg-[#e2e4e6] transition-colors" type="button">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                close
              </span>
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 bg-background-light overflow-y-auto">
          <Conversation className="min-h-full overflow-y-visible">
            <ConversationContent className="mx-auto max-w-[1000px] gap-6 p-4 md:p-8 pb-32">
              {[...seedMessages, ...messages].map((message) => {
                if (message.role === "user") {
                  return (
                    <Message key={message.id} from="user" className="items-end gap-1">
                      <p className="text-[#647587] text-xs font-medium pr-1">You</p>
                      <MessageContent className="max-w-[80%] md:max-w-[60%] rounded-2xl rounded-tr-sm bg-primary px-5 py-3 text-white shadow-sm text-base leading-relaxed">
                        {message.content}
                      </MessageContent>
                    </Message>
                  );
                }

                if (message.id === "seed-assistant") {
                  return (
                    <Message key={message.id} from="assistant" className="items-start gap-1 w-full">
                      <div className="flex items-center gap-2 pl-1 mb-1">
                        <span className="material-symbols-outlined text-primary text-sm">
                          smart_toy
                        </span>
                        <p className="text-[#647587] text-xs font-medium">Assistant</p>
                      </div>
                      <MessageContent className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white border border-[#e5e7eb] px-5 py-4 text-[#111417] shadow-sm text-base leading-relaxed">
                        {message.content}
                      </MessageContent>

                      <div className="w-full flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-2">
                        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#111417] hover:bg-gray-50 transition shadow-sm whitespace-nowrap" type="button">
                            <span className="material-symbols-outlined text-base">tune</span>
                            Filter
                          </button>
                          <button className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-bold text-primary shadow-sm whitespace-nowrap" type="button">
                            Under $300
                          </button>
                          <button className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#111417] hover:bg-gray-50 transition shadow-sm whitespace-nowrap" type="button">
                            Best Rating
                          </button>
                          <button className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#111417] hover:bg-gray-50 transition shadow-sm whitespace-nowrap" type="button">
                            Free Shipping
                          </button>
                          <button className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#111417] hover:bg-gray-50 transition shadow-sm whitespace-nowrap" type="button">
                            Lumber Support
                          </button>
                        </div>

                        <div className="p-5 bg-gradient-to-r from-[#eef7ff] to-white border border-blue-100 rounded-xl shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="material-symbols-outlined text-primary"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                lightbulb
                              </span>
                              <p className="text-[#111417] text-base font-bold">AI Insight</p>
                            </div>
                            <p className="text-[#647587] text-sm leading-relaxed">
                              The <span className="font-bold text-[#111417]">ErgoLife Mesh</span>{" "}
                              chair has the most positive mentions regarding lumbar support specifically for users over 6ft tall.
                            </p>
                          </div>
                          <div
                            className="h-24 w-full sm:w-32 bg-white rounded-lg border border-blue-50 bg-center bg-contain bg-no-repeat shrink-0"
                            role="img"
                            aria-label="Detail shot of chair lumbar support mechanism"
                            style={{
                              backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcd0SbYm6AC4gCVD84bniHQuf78_8dvL-iiO3IOken_z7cfriArECHXkuVdqCrEjPxb8mtFPijUCFDdZIMyDSZU-BwOjR7zbi2eCZmjcCq1RR3lzndUIJ9TZembTvEAXD1_Veceeby_59TDrx9KtT4OsM6KbQ7UqIsME2SmrrcA6BoYPDV1XtrXaoMyIT-Jiy45z1QIbG_iLig2nFD4ug0pTRXao6Bese6tUrqgmGLOVm5xzom1g5uaBgfzPKu1rTu8qXcdqsN9ag')",
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="group flex flex-col bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-all duration-200">
                            <div className="relative aspect-[4/3] bg-[#f8fafc] overflow-hidden">
                              <div
                                className="absolute inset-0 bg-center bg-contain bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                role="img"
                                aria-label="ErgoLife Mesh Chair black front view"
                                style={{
                                  backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-MVvwiqSN8xhAojMET2bSQ7GXYFfaQilgrDMfErLwSRGPcJf7fxCAbiLwPxowt2o-_P30SapcebWq-fXxyGg2OYA4koEX7gKvcz046IiaW198IJcGi_oH1u-vjBQhvyqYjrYIadFFsl0RvbX6PcVs67QMftGU5fFgsPmqGeFLm9v28MXf1q6E_V10v-ChH3eWgqxOsDzBsAE1PZfL70xIcUQcYVWg8hbjDWEy0Rd2GmoFjvPc5SQQw-NPe4DPTMzOxbi2gYCXivg')",
                                }}
                              />
                              <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                                Best Seller
                              </div>
                              <button className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded-full text-gray-400 hover:text-red-500 transition-colors backdrop-blur-sm" type="button">
                                <span className="material-symbols-outlined text-[20px]">favorite</span>
                              </button>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                              <div className="flex justify-between items-start gap-2 mb-2">
                                <h3 className="font-bold text-[#111417] text-base leading-snug line-clamp-2">
                                  ErgoLife High-Back Mesh Chair
                                </h3>
                              </div>
                              <div className="flex items-center gap-1 mb-3">
                                <div className="flex text-primary">
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star_half
                                  </span>
                                </div>
                                <span className="text-xs text-[#647587] font-medium">(1,240)</span>
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#f0f2f4]">
                                <div className="flex flex-col">
                                  <span className="text-lg font-bold text-[#111417]">$249.00</span>
                                  <span className="text-[10px] text-[#647587] line-through">$299.00</span>
                                </div>
                                <button className="bg-primary hover:bg-[#d67e25] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors" type="button">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="group flex flex-col bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-all duration-200">
                            <div className="relative aspect-[4/3] bg-[#f8fafc] overflow-hidden">
                              <div
                                className="absolute inset-0 bg-center bg-contain bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                role="img"
                                aria-label="ComfortPlus Task Chair grey side view"
                                style={{
                                  backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSAWGG46whQ0lcCzfgoVTPKyNdBSTuWkVidfzavxKDGYY2KmVbN8U5SaS0_oHkRKAN_3zDitnii36PHnGtUd2yDBARl8FyKqjPtTx5lSvKZr51dewbGYPS5zwXK-dj2NyGKQ8K9lKCBVBbi_zw41bCUd2pWZLOMEeUK2BAv_vsXqah-BWsX2kcaRNMJzcl3YLoDWsx4POCeXVbyZCmrsbAcOkNZIHZEmvFqI872Sk3zR3qffU5AenOZEaqyuly9qzTUOzJHoS3ao0')",
                                }}
                              />
                              <button className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded-full text-gray-400 hover:text-red-500 transition-colors backdrop-blur-sm" type="button">
                                <span className="material-symbols-outlined text-[20px]">favorite</span>
                              </button>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                              <div className="flex justify-between items-start gap-2 mb-2">
                                <h3 className="font-bold text-[#111417] text-base leading-snug line-clamp-2">ComfortPlus Task Chair</h3>
                              </div>
                              <div className="flex items-center gap-1 mb-3">
                                <div className="flex text-primary">
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px] text-gray-300">star</span>
                                </div>
                                <span className="text-xs text-[#647587] font-medium">(856)</span>
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#f0f2f4]">
                                <div className="flex flex-col">
                                  <span className="text-lg font-bold text-[#111417]">$199.00</span>
                                </div>
                                <button className="bg-primary hover:bg-[#d67e25] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors" type="button">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="group flex flex-col bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-all duration-200">
                            <div className="relative aspect-[4/3] bg-[#f8fafc] overflow-hidden">
                              <div
                                className="absolute inset-0 bg-center bg-contain bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                role="img"
                                aria-label="BackSupport Pro Chair with headrest"
                                style={{
                                  backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6mreCTppgKP_VqVOSFkGsLhczT6gHLJPL8xu_2PCNf9Im3rL2IcU3vbk_YQ_72FK15QkXWWpbTnyCRZ7NrNjXSGam1ra6TnXvceGRGZNDYZzbMugLlhu9FmEUYlcXYOGrqsTMcD-VkP-F_LgmKY0ysD8tLk-ls9Muoi-N4ZsflYU-yxH8BLyRjTJEFUlzuRqlwCM8X6boXulNmbhb9YOYq5puSX0KMxMOfDLwkb930qsFFyRTG4tETsSzRv0ZaSKKjFZiu56qHBA')",
                                }}
                              />
                              <div className="absolute top-3 left-3 bg-[#111417] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">Deal</div>
                              <button className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded-full text-gray-400 hover:text-red-500 transition-colors backdrop-blur-sm" type="button">
                                <span className="material-symbols-outlined text-[20px]">favorite</span>
                              </button>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                              <div className="flex justify-between items-start gap-2 mb-2">
                                <h3 className="font-bold text-[#111417] text-base leading-snug line-clamp-2">BackSupport Pro Series</h3>
                              </div>
                              <div className="flex items-center gap-1 mb-3">
                                <div className="flex text-primary">
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    star
                                  </span>
                                </div>
                                <span className="text-xs text-[#647587] font-medium">(42)</span>
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#f0f2f4]">
                                <div className="flex flex-col">
                                  <span className="text-lg font-bold text-[#111417]">$275.50</span>
                                  <span className="text-[10px] text-[#647587] line-through">$350.00</span>
                                </div>
                                <button className="bg-primary hover:bg-[#d67e25] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors" type="button">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4 mt-4">
                          <button className="flex items-center gap-2 text-[#647587] hover:text-primary font-medium text-sm transition-colors" type="button">
                            Show more results
                            <span className="material-symbols-outlined text-lg">expand_more</span>
                          </button>
                          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#e5e7eb] rounded-full shadow-sm hover:shadow-md hover:bg-[#f8fafc] transition-all group" type="button">
                            <div className="p-1 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                              <span className="material-symbols-outlined text-lg">search</span>
                            </div>
                            <span className="text-[#111417] font-bold text-sm">Start New Search</span>
                          </button>
                        </div>
                      </div>
                    </Message>
                  );
                }

                return (
                  <Message key={message.id} from="assistant" className="items-start gap-1">
                    <div className="flex items-center gap-2 pl-1 mb-1">
                      <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                      <p className="text-[#647587] text-xs font-medium">Assistant</p>
                    </div>
                    <MessageContent className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white border border-[#e5e7eb] px-5 py-4 text-[#111417] shadow-sm text-base leading-relaxed">
                      {message.content}
                    </MessageContent>
                  </Message>
                );
              })}
            </ConversationContent>
            <ConversationScrollButton className="bg-white text-[#111417] shadow-sm" />
          </Conversation>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-[#f0f2f4] p-4 md:px-8 md:py-5 z-20">
          <div className="mx-auto max-w-[1000px] relative">
            <div className="rounded-xl bg-[#f0f2f4] p-2 pr-2 ring-offset-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <PromptInput
                onSubmit={handleSubmit}
                className="[&_[data-slot=input-group]]:border-transparent [&_[data-slot=input-group]]:shadow-none [&_[data-slot=input-group]]:bg-transparent"
              >
                <PromptInputButton className="h-10 w-10 rounded-lg text-[#647587] hover:bg-white hover:text-primary" type="button">
                  <span className="material-symbols-outlined">add_circle</span>
                </PromptInputButton>
                <PromptInputTextarea
                  placeholder="Ask follow up questions..."
                  className="flex-1 bg-transparent border-none p-2 text-[#111417] placeholder:text-[#9eaebc] focus:ring-0 text-base"
                />
                <PromptInputSubmit className="h-10 w-10 rounded-lg bg-primary text-white shadow-sm hover:bg-[#d67e25]">
                  <span className="material-symbols-outlined">arrow_upward</span>
                </PromptInputSubmit>
              </PromptInput>
            </div>
            <div className="mt-2 text-center">
              <p className="text-[11px] text-[#9eaebc]">
                AI can make mistakes. Please check important info.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
