import React from 'react';

const Karya = ({ data }) => {
  // 'data' di sini sudah berisi maksimal 3 item yang dikirim dari index.astro
  
  return (
    <section className="py-20" id="karya">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
           <div>
             <h2 className="text-3xl font-bold text-gray-800 mb-2">Katalog Karya</h2>
             <p className="text-gray-600">Karya kreatif dari anggota komunitas.</p>
           </div>
           {/* Tombol di kanan atas (opsional, bisa juga ditaruh di bawah) */}
           <a href="/karya" className="hidden md:inline-flex text-primary font-medium hover:underline">
             Lihat Semua &rarr;
           </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((item, index) => (
             <div key={index} className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-lg transition-shadow">
                {/* Isi Card Karya sesuai desainmu */}
                <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                   <img src={item.data.image} alt={item.data.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg mb-1">{item.data.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{item.data.description}</p>
                <a href={`/karya/${item.slug}`} className="text-sm text-primary mt-3 block font-medium">Lihat Detail</a>
             </div>
          ))}
        </div>

        {/* Tombol Lihat Semua Mobile */}
        <div className="mt-8 text-center md:hidden">
           <a href="/karya" className="btn btn-outline">Lihat Semua Karya</a>
        </div>
      </div>
    </section>
  );
};

export default Karya;