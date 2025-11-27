import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Proyek({ data = [] }){
  return (
    <section id="proyek" className="py-16 border-t border-gray-100">
      <div 
        className="max-w-6xl mx-auto px-4 reveal"
        suppressHydrationWarning={true}
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold title-accent">Katalog Proyek</h2>
            <p className="text-gray-600">Kategori: Sosial Media Campaign, Volunteering, Aksi Integritas, Seminar Aksi.</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button className="proyek-prev p-2 rounded-lg border border-primary/30 hover:bg-comp3/40" aria-label="Prev">‹</button>
            <button className="proyek-next p-2 rounded-lg border border-primary/30 hover:bg-comp3/40" aria-label="Next">›</button>
          </div>
        </div>

        <Swiper
          className="mt-6"
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1.1}
          spaceBetween={14}
          navigation={{ nextEl: '.proyek-next', prevEl: '.proyek-prev' }}
          pagination={{ el: '.proyek-pagination', clickable: true }}
          breakpoints={{ 640:{slidesPerView:1.5, spaceBetween:16}, 768:{slidesPerView:2.2, spaceBetween:18}, 1024:{slidesPerView:3, spaceBetween:20} }}
        >
          {data.map((item, idx)=> {
            // Cek apakah ada link di data proyek tersebut
            const hasLink = !!item.data.link;
            // Tentukan tag pembungkus: 'a' jika ada link, 'div' jika tidak
            const Wrapper = hasLink ? 'a' : 'div';
            // Props tambahan jika itu adalah link (buka di tab baru)
            const wrapperProps = hasLink ? {
                href: item.data.link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block h-full group cursor-pointer" // Tambahkan cursor pointer
            } : {
                className: "block h-full"
            };

            return (
                <SwiperSlide key={idx} className="h-auto">
                <article className="card rounded-2xl overflow-hidden bg-white border h-full flex flex-col hover:-translate-y-1 transition duration-300">
                    {/* Pembungkus Dinamis (a atau div) */}
                    <Wrapper {...wrapperProps}>
                        <div className="relative overflow-hidden h-48">
                            <img 
                                src={item.data.image} 
                                alt={item.data.title} 
                                className={`w-full h-full object-cover transition duration-500 ${hasLink ? 'group-hover:scale-105' : ''}`} 
                                loading="lazy" 
                            />
                            {/* Indikator Link Icon (Opsional, biar user tau bisa diklik) */}
                            {hasLink && (
                                <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                            <div>
                                <div className="chip chip-accent font-semibold">{item.data.category}</div>
                            </div>
                            <h3 className={`font-heading font-semibold text-lg text-primary mt-2 ${hasLink ? 'group-hover:text-accent transition' : ''}`}>
                                {item.data.title}
                            </h3>
                            <p className="text-sm text-gray-700 mt-2 flex-1">{item.data.description}</p>
                            
                            {hasLink && (
                                <span className="text-xs font-bold text-primary mt-4 inline-flex items-center gap-1">
                                    Lihat Detail
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </span>
                            )}
                        </div>
                    </Wrapper>
                </article>
                </SwiperSlide>
            )
          })}
          <div className="proyek-pagination mt-4"></div>
        </Swiper>
      </div>
    </section>
  )
}