import Image from 'next/image';

export function Hero() {
  return (
    <section className="mt-8 mb-12">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl h-[500px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzeTA6CPFM_v8--DhWx5gRNW1RB9AsHk7MCKeV2HfjBEr0g0nHy1FybI8KMR_Zm9nGksuvqTpd7nE-XQjamR-tQ3NZjJWawZrl-v3_UdTz7X8QqqgPsVW39Hikv6sTCXSEugGprBnVp81du4wIYI5RF--XqGluMAEpqfE3-BWcAJ9-aTSqXNQ3sGdXkj-w216_t0tTCYavjpUCKEk5vMIt7FEUzTMAnmrZ8oNrEdHW44gDwphG8p1ou67GDM4JSW__VySxNsuZHbM"
            alt="Stylish summer fashion collection lifestyle shot"
            fill
            className="object-cover opacity-60 transition-transform duration-700 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col items-start justify-center gap-6 px-8 py-20 lg:px-16 lg:py-32 max-w-2xl h-full">
          <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm border border-white/10">
            New Season Arrivals
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white lg:text-6xl">
            Summer <span className="text-primary">Collection</span> 2024
          </h1>
          <p className="text-lg text-gray-200 font-medium max-w-md">
            Discover the warmth of the season with our latest curated styles designed for comfort and elegance.
          </p>
          <div className="flex gap-4 mt-2">
            <button className="flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 transition-all text-white font-bold h-12 px-8 shadow-lg hover:shadow-primary/30">
              Shop Now
            </button>
            <button className="flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white font-bold h-12 px-8 border border-white/30">
              View Lookbook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
