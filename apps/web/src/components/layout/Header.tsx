import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-slate-200 bg-white dark:bg-[#1a1a1a] dark:border-[#333] px-6 py-4 lg:px-20 shadow-sm">
      <div className="flex items-center gap-8 w-full max-w-7xl mx-auto justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>storefront</span>
            </div>
            <h2 className="text-[#181411] dark:text-white text-xl font-extrabold tracking-tight">LuxeStore</h2>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link href="#" className="text-[#181411] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors">Home</Link>
            <Link href="#" className="text-[#181411] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors">Shop</Link>
            <Link href="#" className="text-[#181411] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors">New Arrivals</Link>
            <Link href="#" className="text-[#181411] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors">About</Link>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-[400px] mx-8">
          <label className="flex w-full items-center rounded-lg bg-slate-100 dark:bg-[#333] focus-within:ring-2 focus-within:ring-primary/50 transition-all">
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
          <button className="relative flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#333] transition-colors text-[#181411] dark:text-white">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
          </button>
          <button className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#333] transition-colors text-[#181411] dark:text-white">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    </header>
  );
}
