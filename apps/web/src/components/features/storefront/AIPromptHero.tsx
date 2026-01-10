"use client";

import { PromptInput, PromptInputTextarea, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AIPromptHero() {
  const [model, setModel] = useState("Fast");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (message: { text: string; files: any[] }) => {
    const trimmed = message.text.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    const params = new URLSearchParams({
      prompt: trimmed,
      mode: model.toLowerCase(),
    });
    router.push(`/chat?${params.toString()}`);
  };

  return (
    <section className="mt-6 mb-10 md:mt-8 md:mb-12">
      <div className="relative w-full rounded-2xl ai-gradient-bg px-3 py-8 md:p-12 overflow-hidden border border-slate-100 dark:border-[#333]">
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center">
          <h2 className="text-h2 font-bold text-[#181411] dark:text-white mb-2 leading-tight">
            Find exactly what you want
          </h2>
          <p className="text-sm-fluid text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-lg">
            Describe your perfect product and let our AI curate a personalized selection for you.
          </p>

          <div className="w-full bg-white dark:bg-[#1a1a1a] rounded-xl md:rounded-2xl shadow-ai-input border border-slate-200 dark:border-[#444] p-3 md:p-4 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
            <PromptInput onSubmit={handleSubmit} className="border-none shadow-none [&_[data-slot=input-group]]:border-none [&_[data-slot=input-group]]:shadow-none [&_[data-slot=input-group]]:dark:bg-transparent">
              <PromptInputTextarea 
                placeholder="Describe your needs (e.g., 'I need a lightweight summer dress')..."
                className="w-full bg-transparent border-none text-[#181411] dark:text-white placeholder:text-gray-400 text-base md:text-lg resize-none focus:ring-0 min-h-[80px] md:min-h-[100px] p-0"
              />
              
              <div className="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-dashed border-slate-100 dark:border-[#333]">
                <button 
                  type="button"
                  className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-slate-50 dark:hover:bg-[#333] rounded-full" 
                  title="Upload an image reference"
                >
                  <span className="material-symbols-outlined text-[20px]">attach_file</span>
                </button>

                <div className="flex items-center gap-2 md:gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-[#181411] dark:hover:text-white bg-slate-50 dark:bg-[#252525] px-2.5 py-1.5 md:px-3 rounded-full transition-colors outline-none">
                        <span className="material-symbols-outlined text-[16px] filled">bolt</span>
                        <span className="hidden xs:inline">Mode:</span> {model}
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => setModel("Fast")}>
                        <span className="material-symbols-outlined text-sm mr-2">bolt</span> Fast
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setModel("Premium")}>
                        <span className="material-symbols-outlined text-sm mr-2">auto_awesome</span> Premium
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <PromptInputSubmit
                    className="flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-[#333] text-gray-500 dark:text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined">arrow_forward</span>
                    )}
                  </PromptInputSubmit>
                </div>
              </div>
            </PromptInput>
          </div>
        </div>
      </div>
    </section>
  );
}
