import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Menerima data dari Props (bukan hardcode lagi)
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
          {/* Loop data yang dikirim dari index.astro */}
          {data.map((item, idx)=> (
            <SwiperSlide key={idx}>
              <article className="card rounded-2xl overflow-hidden bg-white border">
                <img src={item.data.image} alt={item.data.title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="chip chip-accent font-semibold">{item.data.category}</div>
                  <h3 className="font-heading font-semibold text-lg text-primary mt-2">{item.data.title}</h3>
                  <p className="text-sm text-gray-700 mt-2">{item.data.description}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
          <div className="proyek-pagination mt-4"></div>
        </Swiper>
      </div>
    </section>
  )
}