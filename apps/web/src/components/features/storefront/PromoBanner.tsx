export function PromoBanner() {
  return (
    <section className="mb-16">
      <div className="relative rounded-2xl overflow-hidden bg-blue-50 dark:bg-[#2a303c] border border-slate-200 dark:border-[#333] flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex-1 space-y-4 text-center md:text-left">
          <span className="text-primary font-bold tracking-wide text-sm uppercase">Limited Time Offer</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#181411] dark:text-white">Get 20% Off Your First Order</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg">
            Use code <span className="font-mono bg-white dark:bg-[#111] px-2 py-1 rounded border border-dashed border-gray-400 text-primary font-bold">WELCOME20</span> at checkout to receive your exclusive discount.
          </p>
        </div>
        <div className="relative z-10 w-full md:w-auto flex-shrink-0">
          <form className="flex w-full max-w-sm gap-2">
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <input 
                className="w-full flex-1 rounded-lg border-slate-200 dark:border-[#444] bg-white dark:bg-[#111] px-4 py-3 text-sm focus:border-primary focus:ring-primary dark:text-white" 
                placeholder="Enter your email" 
                type="email"
              />
              <button className="whitespace-nowrap rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" type="button">
                Subscribe
              </button>
            </div>
          </form>
          <p class="mt-3 text-xs text-center md:text-left text-gray-400">Join our newsletter for more deals.</p>
        </div>
      </div>
    </section>
  );
}
