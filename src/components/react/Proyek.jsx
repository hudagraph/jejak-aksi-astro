import React from 'react';
import { motion } from 'framer-motion';

const Proyek = ({ data }) => {
  // Data sudah dipotong 3 dari index.astro, jadi kita tinggal map
  
  return (
    <section className="py-20 bg-gray-50" id="proyek">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Proyek Terbaru</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aksi nyata yang telah kami lakukan bersama para relawan.
          </p>
        </div>

        {/* Grid Layout (Menggantikan Swiper) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-gray-100"
            >
              {/* Gambar Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.data.image || '/images/default-proyek.jpg'} // Pastikan ada fallback image
                  alt={item.data.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary">
                  {item.data.category || 'Sosial'}
                </div>
              </div>

              {/* Konten Card */}
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(item.data.pubDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                  <a href={`/proyek/${item.slug}`} className="hover:text-primary transition-colors">
                    {item.data.title}
                  </a>
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {item.data.description}
                </p>
                <a
                  href={`/proyek/${item.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all gap-1 text-sm"
                >
                  Lihat Detail
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tombol Lihat Selengkapnya */}
        <div className="mt-12 text-center">
          <a
            href="/proyek"
            className="inline-block px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Lihat Semua Proyek
          </a>
        </div>
      </div>
    </section>
  );
};

export default Proyek;