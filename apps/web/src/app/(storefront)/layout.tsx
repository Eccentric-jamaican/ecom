import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display text-[#181411] bg-background-light dark:bg-background-dark">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
