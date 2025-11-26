import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const items = [
  { img: 'https://picsum.photos/seed/ja-proj1/800/560', cat: 'Sosial Media Campaign', title: '#LangkahIntegritas', desc: 'Kampanye edukasi integritas IG/TikTok.' },
  { img: 'https://picsum.photos/seed/ja-proj2/800/560', cat: 'Volunteering', title: 'Crew Lapangan', desc: 'Support logistik & dokumentasi aksi lingkungan.' },
  { img: 'https://picsum.photos/seed/ja-proj3/800/560', cat: 'Aksi Integritas', title: 'Aksi Mikro #1', desc: 'Eksperimen kebiasaan jujur di komunitas kampus.' },
];

export default function Proyek(){
  return (
    <section id="proyek" className="py-16 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 reveal" suppressHydrationWarning={true}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold title-accent">Katalog Proyek</h2>
            <p className="text-gray-600">Kategori: Sosial Media Campaign, Volunteering, Aksi Integritas.</p>
          </div>
        </div>

        <Swiper
          className="mt-6"
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1.1}
          spaceBetween={14}
          pagination={{ clickable: true }}
          breakpoints={{ 640:{slidesPerView:1.5, spaceBetween:16}, 768:{slidesPerView:2.2, spaceBetween:18}, 1024:{slidesPerView:3, spaceBetween:20} }}
        >
          {items.map((it, idx)=> (
            <SwiperSlide key={idx}>
              <article className="card rounded-2xl overflow-hidden bg-white border">
                <img src={it.img} alt={it.title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="chip chip-accent font-semibold">{it.cat}</div>
                  <h3 className="font-heading font-semibold text-lg text-primary mt-2">{it.title}</h3>
                  <p className="text-sm text-gray-700 mt-2">{it.desc}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
          <div className="h-10"></div>
        </Swiper>
      </div>
    </section>
  )
}