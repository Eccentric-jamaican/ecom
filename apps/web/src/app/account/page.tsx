import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { AccountActions } from "@/app/account/account-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

const ACCOUNT_ITEMS = [
  {
    title: "Profile Info",
    description: "Name, Email, Phone",
    icon: "person",
    iconClass: "text-primary bg-primary/10",
    href: "#",
  },
  {
    title: "Change Password",
    description: "Security & Login",
    icon: "lock",
    iconClass: "text-primary bg-primary/10",
    href: "#",
  },
];

const SHOPPING_ITEMS = [
  {
    title: "My Orders",
    description: "Active & Past Orders",
    icon: "shopping_bag",
    iconClass: "text-orange-500 bg-orange-100/70",
    badge: "2 Active",
    href: "#",
  },
  {
    title: "Wishlist",
    description: "Saved items",
    icon: "favorite",
    iconClass: "text-pink-500 bg-pink-100/70",
    href: "#",
  },
  {
    title: "Addresses",
    description: "Delivery locations",
    icon: "location_on",
    iconClass: "text-green-500 bg-green-100/70",
    href: "#",
  },
  {
    title: "Payment Methods",
    description: "Cards & Wallet",
    icon: "credit_card",
    iconClass: "text-purple-500 bg-purple-100/70",
    href: "#",
  },
];

const APP_SETTINGS_ITEMS = [
  {
    title: "Notifications",
    description: null,
    icon: "notifications",
    iconClass: "text-slate-600 bg-slate-100/80",
    href: "#",
  },
  {
    title: "Language",
    description: "English (US)",
    icon: "translate",
    iconClass: "text-slate-600 bg-slate-100/80",
    href: "#",
  },
  {
    title: "Integrations",
    description: "Connected services & apps",
    icon: "extension",
    iconClass: "text-slate-600 bg-slate-100/80",
    href: "#",
  },
  {
    title: "Privacy Policy",
    description: null,
    icon: "privacy_tip",
    iconClass: "text-slate-600 bg-slate-100/80",
    href: "#",
  },
];


export default async function AccountPage() {
  const user = await currentUser();
  const fullName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Guest";
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : "2021";

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-card px-6 py-3 lg:px-10">
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="text-primary size-8 flex items-center justify-center">
              <span className="material-symbols-outlined !text-3xl">
                local_mall
              </span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg lg:text-xl font-bold leading-tight tracking-tight">
              ShopEase
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-6 lg:gap-9">
            <Link
              className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-bold"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-bold"
              href="#"
            >
              Shop
            </Link>
            <Link
              className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-bold"
              href="#"
            >
              About Us
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-end gap-4 lg:gap-8">
          <div className="flex gap-2">

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full text-slate-900 dark:text-white"
            >
              <span className="material-symbols-outlined text-[24px]">
                shopping_cart
              </span>
              <span className="absolute top-2 right-2 size-2 bg-primary rounded-full" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-900 dark:text-white"
            >
              <span className="material-symbols-outlined text-[24px]">
                notifications
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-900 dark:text-white md:hidden"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </Button>
          </div>
          <Avatar className="hidden md:flex size-10 border border-slate-200 dark:border-slate-700">
            <AvatarImage src={user?.imageUrl ?? ""} alt={fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 w-full px-4 py-6 md:px-8 md:py-10">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Account Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card className="relative overflow-hidden border-slate-100 dark:border-slate-800">
            <div className="absolute -top-1/2 left-1/2 h-full w-full -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-60" />
            <CardHeader className="items-center text-center">
              <div className="relative">
                <div className="p-1 rounded-full border-2 border-primary/20 bg-white dark:bg-slate-800">
                  <Avatar className="size-24 md:size-28 shadow-inner">
                    <AvatarImage src={user?.imageUrl ?? ""} alt={fullName} />
                    <AvatarFallback className="text-xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {fullName}
                </CardTitle>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge className="bg-primary/10 text-primary uppercase tracking-wider">
                    Gold Member
                  </Badge>
                  <CardDescription className="text-sm font-medium">
                    Member since {memberSince}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="flex flex-col gap-6">
            <SettingsSection title="Account" items={ACCOUNT_ITEMS} />
            <SettingsSection title="Shopping" items={SHOPPING_ITEMS} />
            <SettingsSection title="App Settings" items={APP_SETTINGS_ITEMS} />
          </div>

          <div className="pt-2 pb-8">
            <AccountActions />
            <p className="text-center text-slate-400 text-xs mt-4">
              App Version 2.4.0
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

type SettingsItem = {
  title: string;
  description: string | null;
  icon: string;
  iconClass: string;
  href: string;
  badge?: string;
};

type SettingsSectionProps = {
  title: string;
  items: SettingsItem[];
};

function SettingsSection({ title, items }: SettingsSectionProps) {
  return (
    <section>
      <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider px-4 mb-3 opacity-70">
        {title}
      </h3>
      <Card className="gap-0 py-0 overflow-hidden border-slate-100 dark:border-slate-800">
        <CardContent className="px-0">
          {items.map((item, index) => (
            <div key={item.title}>
              <Link
                className="group flex items-center gap-4 px-5 py-4 hover:bg-primary/5 transition-colors"
                href={item.href}
              >
                <div
                  className={`flex items-center justify-center rounded-lg ${item.iconClass} shrink-0 size-10 transition-transform group-hover:scale-110`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-slate-900 dark:text-white text-base font-semibold group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                  {item.description ? (
                    <span className="text-slate-500 dark:text-slate-400 text-xs">
                      {item.description}
                    </span>
                  ) : null}
                </div>
                {item.badge ? (
                  <Badge className="bg-orange-100 text-orange-600 text-[10px] font-bold">
                    {item.badge}
                  </Badge>
                ) : null}
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                  chevron_right
                </span>
              </Link>
              {index < items.length - 1 ? (
                <Separator className="bg-slate-100 dark:bg-slate-800" />
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
