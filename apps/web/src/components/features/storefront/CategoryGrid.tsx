import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Electronics', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvIJbDCq3SakeUuib470M0Ng58xHYC2_jwVeOqpPQUGecSu04OuJ75TR5v3H02LvsB_LchzQ8hxKHSzHGdVH1P2Zc5J-fajZHhRfIRnLdHywpgUC0qRU52t9Nj1daOiAJ1rEcPSze3CXDIW7zWkU3ALXbbPhPKN5WizIXGqMx8PGpjm5ETws7SOfM7h9AlkV8KD3s4HOTm22QFNfatU4s8VubQ6FVY-lddroJECD9Xm3ALm-6tA0f7Gv7Kkd4lELM-2j-mCSoytIg' },
  { name: 'Fashion', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqO1vzglkyGo63PzHtpVb3Cw-Lox9VDAOYFJuHvcshPXTjMkwWDnMF4mAyxNMI3TzgvFrTTYedee_Hb7x-_PRmRgnzvyTE3Px7ar1ncqZMwQ1cblWicfC6L1XiIPPVOH0nl379XdmZm4jQrVOALgnxQ6uS-Xnr4Jh1o3fT1x_1Au8LmVWf7dAOjVRvrkAj6FRlj_D7IhWEPAUSCM7qRy975jp3JxVO1kP7b5j2rOrvUogwxfZp_bji9lFNLPI5HmSkvffKDT2ZUfw' },
  { name: 'Home', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsUjl9IsSDixxMv-qdj8VIcgHeU_d8VNjrwBMlvdZzl_rOLk3chTd-eeS2xLDtX3Ps4bROFtuKyVAX1RVUY-d58Nc3UnCvYWQg4SIrERAjDQdY1QC_3GlzuUR6dlIyykANpclQiWARwAz7czSyJy-L4i01o5Gd0ttDzzMDBXMb7uhIvs08UHu8XLOSg6GiLklFP7o90aaxr-AtkUZuJMAiMK3qU2_Fq0Go756rhk9rxD-CrXjlb5y6tUc6btG4FShKqvElJfMXocU' },
  { name: 'Beauty', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARAo3MbkVKLMTOBzj2CHCAejwgDB7ZqDFv4MXmCwdJAXWGO_YAE6IsDEN9v4yU90-Tjz59-b1ksvDuzAgoEeP64jZ7rNGSNzwTgEkPxfpJEm86DM95eoDRfTtsVooKAvHd-EzixqsA_cg3d5foE9mqwSd8uXhC4rBpXlisE3sT9yp1qd2fKy_6hhUSfKWnClwTRHcNBesqlljjNSUkeh7px1-B80B_t16mhjzkY2cu1rjJfLd5Oir6lhBULAE_MuYvtGC4VAOVELY' },
  { name: 'Sports', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp5hMXO7RIjKKBcxtTQDBsZTHl2YMvUSnLMMC_VjPg6UL51JlPypNUenGH_9Y01drRDz3AmIu3I0_1kTajhzW5lFJ_bbHkbbNcYjI6l6CG0WpfKyNg684gE60-kaNYDfzMV3ifm3NumjrMV5EO6qLPee2L-htHgGaR0r0Np_Qmk0c7alRuZkVGthlK4HiN1YyLAmdmpknClcRedGUhu_uqeZgknl2u8EfU53AAqahTqxuUIVLT1iYbLZCAg9z_eHO3ArIZRIrmeT8' },
  { name: 'Toys', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtEjjUkqqFl8iKpJTUQi-KxqZ2rcN3ruqEv45uDj51Z3M73XEPuFafoyVf-8tCZ7KkVw9-eTRNWaOgmDaRPHW3BnBph2WFYtI7Ae0w1ua0pn4Nt5uogT2MY69LV1_rMUKjx0u23yP1PZOCqX6lL8360B1RF9XhuGhwamj6GFdlrr9fdjtX_Z8Je5j_4FXritPFNlrrna4-2MdZ0TUvcBKIyonZaBWTlxtMXHybZAXGOVt-fcTphezBy-HG9rQRZ8Nx0xxGEhqz4BM' },
];

export function CategoryGrid() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-bold text-[#181411] dark:text-white">Shop by Category</h2>
        <Link href="#" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
          View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {CATEGORIES.map((cat) => (
          <Link key={cat.name} href="#" className="group flex flex-col items-center gap-4 text-center">
            <div className="aspect-square w-full max-w-[160px] overflow-hidden rounded-full border-2 border-transparent group-hover:border-primary transition-all p-1">
              <div className="relative h-full w-full rounded-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <p className="text-[#181411] dark:text-white font-semibold group-hover:text-primary transition-colors">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
