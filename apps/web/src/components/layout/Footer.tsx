import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1a1a1a] border-t border-slate-100 dark:border-[#333] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>storefront</span>
              <h3 className="text-xl font-extrabold text-[#181411] dark:text-white">LuxeStore</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for premium quality products. We believe in quality, style, and customer satisfaction above all else.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Official Website">
                <i className="material-symbols-outlined">public</i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Email Us">
                <i className="material-symbols-outlined">alternate_email</i>
              </Link>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-bold text-[#181411] dark:text-white mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Fashion</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-[#181411] dark:text-white mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Order Status</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Returns & Warranty</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-[#181411] dark:text-white mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-[#333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">© {new Date().getFullYear()} LuxeStore Inc. All rights reserved.</p>
          <div className="flex gap-4 opacity-70">
            <div className="h-6 w-10 bg-gray-200 dark:bg-[#444] rounded"></div>
            <div className="h-6 w-10 bg-gray-200 dark:bg-[#444] rounded"></div>
            <div className="h-6 w-10 bg-gray-200 dark:bg-[#444] rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
