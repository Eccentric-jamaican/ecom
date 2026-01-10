"use client";

import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function AccountActions() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <Button
        asChild
        variant="outline"
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
      >
        <Link href="/sign-in">
          <span className="material-symbols-outlined">login</span>
          Sign In
        </Link>
      </Button>
    );
  }

  return (
    <SignOutButton redirectUrl="/">
      <Button
        variant="outline"
        className="w-full rounded-xl border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <span className="material-symbols-outlined">logout</span>
        Log Out
      </Button>
    </SignOutButton>
  );
}
