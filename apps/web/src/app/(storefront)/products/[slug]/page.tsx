import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RELATED_PRODUCTS = [
  {
    slug: 'weekend-duffel',
    name: 'Weekend Duffel',
    category: 'Travel Gear',
    price: 145.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRALOuN4lPH_f0xvwcTqhc1lq_7wuwUDeqNQE08WHiIDC_y3QLmCsvqAD4vmu6Ek9e-lEeqvh_-Ch2cGiZNOnuQeeOambsfg63cdxFxA2C6ukrG2pKDPYr-yNE55mBb4lFoi9Ckqa5xSGgOpc9EQP9Dt6NmjnvjehLF_r2T4TUNAHRvJ0P8yXhQiJ4QH_5m-zDhBTWVm2hE6gscF_CbczXImp-DCeMzwc99w7JEpzQMTGW7STdLhSLmlXUrqfjl_4WdjGIUGlRb2M'
  },
  {
    slug: 'field-watch',
    name: 'Field Watch',
    category: 'Accessories',
    price: 195.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlEU5g-3JaTBpmJGw4TwSQ-MBwyKqBeYBCpdy5c0PKq8dOKmffDgds71qK1rsWU2X8odyZwWtIAb9NGRqJw_dAZMKDEhpb9rjweirWok1hDAJmqE7Zq62CCfOmuwTohWaOKZEXNZBd4fzHAF8ffPpGKzG95mf9W421KP3G64GQndT4NCcAyNhWYu9nx8z44TP_uN_NT2QEnG3ndmjd_8xcAKZXVainjFqNQxNdwSLvZ-BUHk8K6cH01N_CBCUbgolZ_JVgKccMahE'
  },
  {
    slug: 'insulated-bottle',
    name: 'Insulated Bottle',
    category: 'Accessories',
    price: 35.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASD2GE5E2o_-HTk3M7N0J89H0gPBQxiRH6T94WwZeEY3Z6YYN47N4MgdYPjdcs1yESpFEzHAktbAcvJ-MI07rUmjgVCeImhRP6kWYOOEMoet7gpm5VhOrrxK1HBaGI9dHuQ1CD5xrNgSVkkHGXOPsmz2vRkGUncQ1mG9pu1Mm7myyRc7hNOaOz-p-56VxHh1rKUZerkJSZjwquSg0yK-0CbcpKIhBgjWe0Z-8-n2u47jzwb-jPcjDPwYMr_FzL5mvkywW0j9ScWuU'
  },
  {
    slug: 'trail-runners',
    name: 'Trail Runners',
    category: 'Footwear',
    price: 110.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb6FoOlbd8kQo-kbQfFz4DYYnM7e2uBWbTYWvekhQuNo7jZpyz7w6G3cfcVOvRByEz-FOwu1_S-yuIJvq6Jedol4ebIklCIg2MJeWryvPM5iVGoe7Vywft59eRSmKxRKAoFGrmSRZin_bdbZalhuCOGstzn08G3eloNqqd_TndzxXbHoAQKTf2OQr-bD_ZTHa_BweK3xccsqdCLKWMpNDFlcLU3bxbYDLEmEAN8Xh5yBFxrFUpf3DBLTpLENYkVlvR35Gb02KBx8I'
  }
];

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-6 md:py-10">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 pb-6 md:pb-10 text-sm">
        <Link className="text-[#897561] font-medium leading-normal hover:text-primary hover:underline" href="/">Home</Link>
        <span className="text-[#897561] font-medium leading-normal">/</span>
        <Link className="text-[#897561] font-medium leading-normal hover:text-primary hover:underline" href="#">Men</Link>
        <span className="text-[#897561] font-medium leading-normal">/</span>
        <Link className="text-[#897561] font-medium leading-normal hover:text-primary hover:underline" href="#">Backpacks</Link>
        <span className="text-[#897561] font-medium leading-normal">/</span>
        <span className="text-[#181411] dark:text-white font-medium leading-normal">Urban Explorer</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
        {/* Product Gallery (Left Column) */}
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnail Strip - Keeping simple overflow for thumbnails as usually preferred, but ensuring touch friendliness */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-hide lg:max-h-[600px] min-w-[80px]">
            <button className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-primary ring-2 ring-primary/20 bg-gray-100">
              <Image 
                width={80} 
                height={80} 
                className="w-full h-full object-cover" 
                alt="Close up of black backpack texture" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvjQynBcuk49JcXJrt1KudXGkB9jlUpC5UFflwNa0c6mJVTyzvMzFWkUnj2IEfTBqiUWCokgi_DmskgIxCCeL1MVS3M5cLjpYPBlXjy_0MNj_6Asu7iH8fQDain_hYAGSRBR29LdlDzoP6fNNJMSbeysG-W9zev-YKv28XRA_O3j4aeiuFpXoVLJaxBUGT7t8-WG4wg1Bi9s6ltF4MtAX4nn3pDxUU2DZYKh_X0N6Lv8zJ9u-3lZHRLis2qEIvESLeb48GBk3ftvs"
              />
            </button>
            <button className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 bg-gray-100">
              <Image 
                width={80} 
                height={80} 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
                alt="Backpack on a wooden table outdoors" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu263twUny8yewLBIyz1Q3VmqAl_oG3tIhYbrtPJrAfv8L6OKosvCrBLyQkDWa16O-oYWentJs8-u1kywIJ3D8cetxOlFM-56-QC-u6qGzg4tUbbHBeyym7EGeE4MUIPEu5nh5SHGyvfZyrqPrg4dC7DmJSeJbqV5808jZBFb-iMFszQ2giRO2dVV3UyOX3pKALN6Ubwxa8yQqzkz59RTHBFJaZ21pafJ_filO9qblRdX7rDAqBcJ28tjAV9rfs3FWTu_b-DJAvCk"
              />
            </button>
            <button className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 bg-gray-100">
              <Image 
                width={80} 
                height={80} 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
                alt="Person wearing the backpack hiking" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5Qv237f3NHOTl6ec9vxdyBXt9C05SWVPcKzWgjIr5tc70NefMivcy5mlQPJqGCdiQMa6m-V42nIlZA9WNyd9U8pSa7Qf1XUo13AFiQS-KPpcouT8isr569VC9aH_SpB0HPfB2JnqGwbyXwFyHOmse88Bh5xy7gJOX3MKCZo0s6i646X72lKp6EHVS75lK2g-U_eXI74xDu07PAsDwEYGppRIwhfTQl9yMpLrwpJBc7MKNyiU936Uk9yjtxyavQrGpuIis_XKq5RI"
              />
            </button>
            <button className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 bg-gray-100">
              <Image 
                width={80} 
                height={80} 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
                alt="Backpack zipper detail" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWYEki8moLq1j75BPFZgVDoLix5ahO1Nd2KLzY3y6_3WSWEWx6VbfzC-X1HWtgnC1bCmTkDtpXKTSc_peDMeNioqftEPzclvqcIVHNY7mRMKdFyDScY0cnw4FR4kLAzqxDFC4LgWUe4pz5pu2wm1OKpkR9YqvHdtvxYAwsV5DBbV4pUB8qFsrW6BLHpX-lrjZZVRF2NEjl8RHK-woEIaSBZ9Xn1BH-2K1qWdN_kZc73i0wJpIyXx00xhyCT5VSOIN6aj50gDso5bY"
              />
            </button>
          </div>
          
          {/* Main Image */}
          <div className="flex-1 bg-white dark:bg-[#1a1612] rounded-xl overflow-hidden shadow-sm relative group cursor-zoom-in h-[400px] lg:h-[600px]">
            <Image 
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105" 
              alt="Black modern hiking backpack isolated" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUVgQRBadvnR47Ltj8nNYcl0BluMB8vg5XOftQVdq_hnFtpaagw1kTXGK_O3bWvrxX2NgxN_fgKmtmb29knYkyct-zhZCdHTsLIG3Neua2U5bmgjk7XoeZ4apf8Tv-cRtk9IWvNC9VjVE8Xsl7kG9rULIgDZH5XrMybmZbMk0LutPnN6dKPvg2VJXLUDyLn9dnq_2qwSAFczvk49w5x-mT_vUbMglUiq8snbiZOO6rumYdoxcufrLQ66WFUXyyS7YQyKdhcC9x0nE"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-[#181411] text-xs font-bold px-3 py-1 rounded-full">New Arrival</span>
            </div>
            <button className="absolute bottom-4 right-4 p-2 bg-white/90 dark:bg-black/50 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">fullscreen</span>
            </button>
          </div>
        </div>

        {/* Product Info (Right Column / Buy Box) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Title & Price */}
          <div className="border-b border-[#f4f2f0] dark:border-[#332a22] pb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#181411] dark:text-white mb-2">Urban Explorer Hiking Backpack</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star_half</span>
              </div>
              <a className="text-sm text-[#897561] hover:text-primary underline decoration-dotted" href="#reviews">4.8 (120 reviews)</a>
            </div>
            <div className="flex items-end gap-3">
              <h2 className="text-3xl font-bold text-[#181411] dark:text-white">$129.00</h2>
              <span className="text-lg text-[#897561] line-through mb-1">$159.00</span>
              <span className="text-sm text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded mb-1 font-bold">Save 20%</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#6b5c51] dark:text-[#a89b91] leading-relaxed">
            Designed for the modern adventurer, this backpack features water-resistant canvas, ergonomic straps, and a dedicated 15" laptop sleeve. Perfect for city commutes or weekend trail hikes.
          </p>

          {/* Selectors */}
          <div className="space-y-6">
            {/* Color */}
            <div>
              <span className="block text-sm font-bold text-[#181411] dark:text-white mb-3">Color: <span className="font-normal text-[#897561]">Obsidian Black</span></span>
              <div className="flex gap-3">
                <button aria-label="Select Black" className="w-10 h-10 rounded-full bg-[#181411] border-2 border-white ring-2 ring-primary shadow-sm hover:scale-110 transition-transform"></button>
                <button aria-label="Select Forest Green" className="w-10 h-10 rounded-full bg-[#3c4e3c] border-2 border-transparent hover:border-gray-300 ring-2 ring-transparent dark:hover:border-gray-500 shadow-sm hover:scale-110 transition-transform"></button>
                <button aria-label="Select Sand" className="w-10 h-10 rounded-full bg-[#8c7b6c] border-2 border-transparent hover:border-gray-300 ring-2 ring-transparent dark:hover:border-gray-500 shadow-sm hover:scale-110 transition-transform"></button>
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="block text-sm font-bold text-[#181411] dark:text-white">Capacity</span>
                <button className="text-xs text-primary font-bold hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button className="h-12 border border-[#e6e0db] dark:border-[#443b32] rounded-lg text-sm font-bold hover:border-primary hover:text-primary transition-all bg-white dark:bg-[#1a1612]">20L</button>
                <button className="h-12 border-2 border-primary rounded-lg text-sm font-bold text-primary bg-primary/5 dark:bg-primary/10 relative">
                  30L
                  <span className="absolute -top-2 -right-2 bg-primary text-[#181411] text-[10px] px-1.5 py-0.5 rounded-full">Popular</span>
                </button>
                <button className="h-12 border border-[#e6e0db] dark:border-[#443b32] rounded-lg text-sm font-bold hover:border-primary hover:text-primary transition-all bg-white dark:bg-[#1a1612] text-gray-400 cursor-not-allowed">40L</button>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center border border-[#e6e0db] dark:border-[#443b32] rounded-lg h-12 bg-white dark:bg-[#1a1612]">
                <button className="w-10 h-full flex items-center justify-center text-[#897561] hover:text-[#181411] dark:hover:text-white">
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <input className="w-10 h-full text-center border-none focus:ring-0 text-[#181411] dark:text-white bg-transparent font-bold" readOnly type="text" value="1"/>
                <button className="w-10 h-full flex items-center justify-center text-[#897561] hover:text-[#181411] dark:hover:text-white">
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
              <button className="flex-1 h-12 bg-primary hover:bg-[#d67e25] text-[#181411] font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base">
                <span className="material-symbols-outlined">shopping_bag</span>
                Add to Cart
              </button>
              <button className="h-12 w-12 flex items-center justify-center rounded-lg border border-[#e6e0db] dark:border-[#443b32] text-[#181411] dark:text-white hover:bg-[#f4f2f0] dark:hover:bg-[#332a22] transition-colors">
                <span className="material-symbols-outlined">favorite_border</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#f4f2f0] dark:border-[#332a22]">
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <span className="material-symbols-outlined text-primary text-2xl">local_shipping</span>
                <span className="text-[10px] uppercase font-bold text-[#897561] tracking-wider">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                <span className="text-[10px] uppercase font-bold text-[#897561] tracking-wider">Secure</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <span className="material-symbols-outlined text-primary text-2xl">published_with_changes</span>
                <span className="text-[10px] uppercase font-bold text-[#897561] tracking-wider">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details & Specs Section */}
      <div className="mt-20 border-t border-[#f4f2f0] dark:border-[#332a22] pt-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/4">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Product Specs</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm text-[#6b5c51] dark:text-[#a89b91]">Volume: 30 Liters</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm text-[#6b5c51] dark:text-[#a89b91]">Weight: 1.2 kg / 2.6 lbs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm text-[#6b5c51] dark:text-[#a89b91]">Dimensions: 50 x 30 x 20 cm</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm text-[#6b5c51] dark:text-[#a89b91]">Material: 500D Nylon Canvas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm text-[#6b5c51] dark:text-[#a89b91]">Laptop: Up to 16" MacBook Pro</span>
              </li>
            </ul>
          </div>
          <div className="lg:w-3/4">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Description</h3>
            <div className="prose dark:prose-invert max-w-none text-[#6b5c51] dark:text-[#a89b91] text-body">
              <p className="mb-4">The Urban Explorer Backpack is built for those who refuse to be defined by a single environment. Whether you're navigating the concrete jungle or escaping to actual ones, this pack adapts to your needs. The main compartment features a wide-mouth opening for easy packing, while the side access zipper lets you grab your laptop without unpacking everything.</p>
              <p>Constructed from our proprietary weather-shedding canvas, it keeps your gear dry in unexpected downpours. The ergonomic shoulder straps are padded with dual-density foam for all-day comfort, even when fully loaded. Includes a hidden passport pocket for secure travel.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 scroll-mt-24" id="reviews">
        <h2 className="text-2xl font-bold text-[#181411] dark:text-white mb-8">Customer Reviews</h2>
        <div className="flex flex-col lg:flex-row gap-12 bg-[#f8f7f6] dark:bg-[#1e1a15] rounded-xl p-8">
          {/* Rating Summary */}
          <div className="lg:w-1/3 flex flex-col gap-2">
            <div className="flex items-end gap-4">
              <p className="text-[#181411] dark:text-white text-6xl font-black leading-none tracking-tight">4.8</p>
              <div className="flex flex-col mb-1">
                <div className="flex text-primary">
                  <span className="material-symbols-outlined text-[24px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[24px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[24px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[24px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[24px] fill-current">star_half</span>
                </div>
                <p className="text-[#6b5c51] dark:text-[#a89b91] text-sm font-medium">Based on 120 reviews</p>
              </div>
            </div>
            {/* Bars */}
            <div className="mt-6 space-y-3">
              {[78, 15, 4, 1, 2].map((percent, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span className="w-3 text-[#181411] dark:text-white font-bold">{5 - index}</span>
                  <div className="flex-1 h-2 bg-[#e6e0db] dark:bg-[#332a22] rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${percent}%` }}></div>
                  </div>
                  <span className="w-8 text-right text-[#897561]">{percent}%</span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-3 border border-[#181411] dark:border-white text-[#181411] dark:text-white font-bold rounded-lg hover:bg-[#181411] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">Write a Review</button>
          </div>

          {/* Reviews Grid */}
          <div className="lg:w-2/3 grid gap-6">
             {/* Review 1 */}
            <div className="border-b border-[#e6e0db] dark:border-[#332a22] pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                    <Image fill className="object-cover" alt="Portrait of a smiling man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArlQxS4u_89n2L6D1OB9MCLQ94Wb23TSjCT3EyCSF6AVJJWVNC_NoQk3ibQ-MmB_7PobkoG6A2TODFo8QUG8U42YP_4EuZchxAEnZr5UOuacrzlqQm2F9MpewsEA2fLlOM8B8F536k5CmIJiUWH-mZn8bNg2YBOklowafAj8eF7op_gNLX8dA8TsRjUL6ucIdomYMLc4P4jB5RXSd_4F7VbzxKrDnsVWtdvLr7XiJQBLA7vslX2v4JbfISqYGNNLSMIUrbi0Drbzw"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#181411] dark:text-white text-sm">James M.</h4>
                    <span class="text-xs text-[#897561]">Verified Buyer • 2 days ago</span>
                  </div>
                </div>
                <div className="flex text-primary text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px] fill-current">star</span>
                  ))}
                </div>
              </div>
              <h5 className="font-bold text-[#181411] dark:text-white text-base mb-1">Perfect for my daily commute</h5>
              <p className="text-[#6b5c51] dark:text-[#a89b91] text-sm leading-relaxed">The laptop sleeve is actually padded properly, unlike my last bag. The side pockets fit my 32oz water bottle perfectly. Highly recommend!</p>
            </div>

            {/* Review 2 */}
            <div className="border-b border-[#e6e0db] dark:border-[#332a22] pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                    <Image fill className="object-cover" alt="Portrait of a woman smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCECBeutX0OisZl7Iiuu4_8rl_cID6QA1pqIjAYmU4Tl0TgsXfeX3M2liBJMVK_S-5Hp6Y8XE4cHx1tH3QbqfEj-s1ObUtBwjqltTOkdBELgEHkN5rVQJ3NLZ36D4V649yg3LaWUaHtaV9l1vcaWizQXqzvNLVE8Ytp1gtHt7Llje3DHBz1m89qzTAM_qqROncTVBnhwzCGuXdMn2FNxglC11QByNPM6nCwVny7MYDEMPJwdp9QRzpfl5zh1en3-BKMQHg-1xBgsI4"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#181411] dark:text-white text-sm">Sarah L.</h4>
                    <span className="text-xs text-[#897561]">Verified Buyer • 1 week ago</span>
                  </div>
                </div>
                <div className="flex text-primary text-xs">
                   {[...Array(4)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px] fill-current">star</span>
                  ))}
                  <span className="material-symbols-outlined text-[16px] fill-current">star_border</span>
                </div>
              </div>
              <h5 className="font-bold text-[#181411] dark:text-white text-base mb-1">Great quality, but stiff zippers</h5>
              <p className="text-[#6b5c51] dark:text-[#a89b91] text-sm leading-relaxed">The material is amazing and clearly waterproof. The zippers were a bit stiff at first but they are loosening up after a week of use.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#181411] dark:text-white">You Might Also Like</h2>
          <div className="hidden md:flex gap-2">
            <button className="w-10 h-10 rounded-full border border-[#e6e0db] dark:border-[#332a22] flex items-center justify-center hover:bg-[#f4f2f0] dark:hover:bg-[#332a22] transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="w-10 h-10 rounded-full border border-[#e6e0db] dark:border-[#332a22] flex items-center justify-center hover:bg-[#f4f2f0] dark:hover:bg-[#332a22] transition-colors">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Mobile Carousel for Related Products */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full md:hidden"
        >
          <CarouselContent className="-ml-4">
            {RELATED_PRODUCTS.map((product) => (
              <CarouselItem key={product.name} className="pl-4 basis-1/2 sm:basis-1/3">
                <div className="group">
                  <div className="relative aspect-square bg-[#f4f2f0] dark:bg-[#1a1612] rounded-xl overflow-hidden mb-3">
                    <Link href={`/products/${product.slug}`} className="block h-full w-full">
                      <Image 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={product.name}
                        src={product.image}
                      />
                    </Link>
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" type="button" aria-label="Save item">
                      <span className="material-symbols-outlined text-sm">favorite</span>
                    </button>
                  </div>
                  <Link href={`/products/${product.slug}`} className="font-bold text-[#181411] dark:text-white mb-1 block hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-sm text-[#897561] mb-2">{product.category}</p>
                  <p className="font-bold text-[#181411] dark:text-white">${product.price.toFixed(2)}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Desktop Grid for Related Products */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RELATED_PRODUCTS.map((product) => (
            <div key={product.name} className="group">
              <div className="relative aspect-square bg-[#f4f2f0] dark:bg-[#1a1612] rounded-xl overflow-hidden mb-3">
                <Link href={`/products/${product.slug}`} className="block h-full w-full">
                  <Image
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.name} 
                    src={product.image}
                  />
                </Link>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" type="button" aria-label="Save item">
                  <span className="material-symbols-outlined text-sm">favorite</span>
                </button>
              </div>
              <Link href={`/products/${product.slug}`} className="font-bold text-[#181411] dark:text-white mb-1 block hover:underline">
                {product.name}
              </Link>
              <p className="text-sm text-[#897561] mb-2">{product.category}</p> 
              <p className="font-bold text-[#181411] dark:text-white">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
