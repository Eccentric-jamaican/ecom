import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const NavLinks = () => (
    <>
      <Link href="/" className="text-[#181411] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors">Home</Link>
      {/* TODO: Implement Shop Page */}
      <Link href="/shop" className="text-[#181411] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors">Shop</Link>
      {/* TODO: Implement New Arrivals Page */}
      <Link href="/shop/new-arrivals" className="text-[#181411] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors">New Arrivals</Link>
      {/* TODO: Implement About Page */}
      <Link href="/about" className="text-[#181411] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors">About</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-slate-200 bg-white dark:bg-[#1a1a1a] dark:border-[#333] px-6 py-4 lg:px-20 shadow-sm">
      <div className="flex items-center gap-8 w-full max-w-7xl mx-auto justify-between">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#333] transition-colors text-[#181411] dark:text-white"
                  aria-label="Open menu"
                >
                  <span className="material-symbols-outlined">menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-12 px-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-8 text-primary">
                      <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>storefront</span>
                    </div>
                    <h2 className="text-[#181411] dark:text-white text-xl font-extrabold tracking-tight">LuxeStore</h2>
                  </div>
                  <nav className="flex flex-col gap-4">
                    <NavLinks />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>storefront</span>
            </div>
            <h2 className="text-[#181411] dark:text-white text-xl font-extrabold tracking-tight">LuxeStore</h2>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            <NavLinks />
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-[400px] mx-8">
          <label className="flex w-full items-center rounded-lg bg-slate-100 dark:bg-[#333] focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <span className="sr-only">Search products</span>
            <div className="pl-4 text-gray-500 dark:text-gray-400">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="w-full bg-transparent border-none py-2.5 px-3 text-sm text-[#181411] dark:text-white placeholder:text-gray-500 focus:ring-0 outline-none" 
              placeholder="Search for products..."
            />
          </label>
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="relative flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#333] transition-colors text-[#181411] dark:text-white"
            aria-label="View shopping cart"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
          </button>
          <button 
            className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#333] transition-colors text-[#181411] dark:text-white"
            aria-label="View account"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}
