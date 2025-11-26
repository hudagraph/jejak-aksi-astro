import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// KITA HAPUS DATA DUMMY 'const items = [...]' DARI SINI
// Ganti dengan menerima props { data }

export default function Karya({ data = [] }) { 
  return (
    <section id="karya" className="py-16 border-t border-gray-100">
      <div 
        className="max-w-6xl mx-auto px-4 reveal"
        suppressHydrationWarning={true}
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold title-accent">Katalog Karya</h2>
            <p className="text-gray-600">Pilihan karya visual & konten komunitas.</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button className="karya-prev p-2 rounded-lg border border-primary/30 hover:bg-comp3/40" aria-label="Prev">‹</button>
            <button className="karya-next p-2 rounded-lg border border-primary/30 hover:bg-comp3/40" aria-label="Next">›</button>
          </div>
        </div>

        <Swiper
          className="mt-6"
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1.1}
          spaceBetween={14}
          navigation={{ nextEl: '.karya-next', prevEl: '.karya-prev' }}
          pagination={{ el: '.karya-pagination', clickable: true }}
          breakpoints={{ 640:{slidesPerView:1.5, spaceBetween:16}, 768:{slidesPerView:2.2, spaceBetween:18}, 1024:{slidesPerView:3, spaceBetween:20} }}
        >
          {/* Mapping data dari Props */}
          {data.map((item, idx)=> (
            <SwiperSlide key={idx}>
              <article className="card rounded-2xl overflow-hidden bg-white border">
                {/* Perhatikan aksesnya: item.data.image (karena struktur dari Content Collection) */}
                <img src={item.data.image} alt={item.data.title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-lg text-primary">{item.data.title}</h3>
                  <p className="text-sm text-gray-700 mt-2">{item.data.description}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
          <div className="karya-pagination mt-4"></div>
        </Swiper>
      </div>
    </section>
  )
}