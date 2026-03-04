import { useRef, useState } from 'react'

// Komponen Toast Sederhana untuk notifikasi
function Toast({ message, type }){
  if(!message) return null
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none">
      <div className={`max-w-md w-full mx-4 rounded-xl shadow-lg px-4 py-3 text-sm pointer-events-auto ${type==='error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
        <div className="flex items-start gap-3">
          <div className="font-semibold">{type==='error'?'Gagal':'Berhasil'}</div>
          <div className="opacity-90">{message}</div>
        </div>
      </div>
    </div>
  )
}

// Validasi format nomor WA (08xx... atau +628xx..., minimal 10 digit)
function isValidWA(val) {
  const cleaned = val.replace(/[\s\-().]/g, '')
  return /^(\+628\d{7,13}|08\d{7,13})$/.test(cleaned)
}

export default function FaqJoin(){
  const formRef = useRef(null)
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const [loading, setLoading] = useState(false)

  const showToast = (message, type='success')=>{
    setToast({ message, type })
    setTimeout(()=> setToast({ message:'', type }), 3500)
  }

  const onSubmit = async (e)=>{
    e.preventDefault()
    const f = formRef.current

    // ── Validasi field wajib ────────────────────────────────────────────────
    const nama     = f?.elements['Nama']?.value?.trim()
    const email    = f?.elements['Email']?.value?.trim()
    const whatsapp = f?.elements['WhatsApp']?.value?.trim()
    const domisili = f?.elements['Domisili']?.value?.trim()
    const peran    = f?.elements['Peran']?.value

    if(!nama || !email || !whatsapp || !domisili){
      showToast('Mohon lengkapi semua field.', 'error'); return
    }
    if(!peran){
      showToast('Pilih peran terlebih dahulu.', 'error'); return
    }
    if(!isValidWA(whatsapp)){
      showToast('Format nomor WhatsApp tidak valid. Contoh: 08123456789 atau +6281234567', 'error'); return
    }
    if(!f?.elements['Consent']?.checked){
      showToast('Setujui kebijakan privasi dulu.', 'error'); return
    }

    // ── Kirim ke Netlify Function ───────────────────────────────────────────
    setLoading(true)
    try {
      const res = await fetch('/api/gabung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, whatsapp, domisili, peran }),
      })

      const data = await res.json()

      if(res.ok && data.success){
        // Redirect ke halaman thank-you
        window.location.href = '/thank-you'
      } else {
        showToast(data.error || 'Terjadi kesalahan, coba lagi.', 'error')
        setLoading(false)
      }
    } catch {
      showToast('Koneksi gagal, periksa internet dan coba lagi.', 'error')
      setLoading(false)
    }
  }

  return (
    <section id="gabung-faq" className="py-16 border-t border-gray-100">
      {/* PENTING: suppressHydrationWarning={true}
          Ini mencegah error "Hydration Mismatch" karena class 'is-visible' 
          yang ditambahkan oleh script animasi (MainLayout).
      */}
      <div 
        className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 reveal"
        suppressHydrationWarning={true}
      >
        {/* Bagian FAQ */}
        <section id="faq" aria-labelledby="faq-title">
          <h2 id="faq-title" className="font-heading text-3xl font-semibold title-accent">FAQ</h2>
          <div className="mt-6 divide-y divide-gray-100 border rounded-2xl bg-white">
            <details className="p-5" open>
              <summary className="font-semibold cursor-pointer">Apa itu Jejak Aksi?</summary>
              <p className="mt-2 text-gray-700">Gerakan kolaboratif yang menyalakan aksi nyata berlandaskan nilai integritas—dimulai dari komunitas dan langkah-langkah kecil yang konsisten.</p>
            </details>
            <details className="p-5">
              <summary className="font-semibold cursor-pointer">Apa tujuan Jejak Aksi?</summary>
              <p className="mt-2 text-gray-700">Membangun budaya integritas yang praktis dan berdampak: mempertemukan relawan, menginisiasi aksi mikro, mendokumentasikan cerita, dan menumbuhkan kolaborasi lintas komunitas.</p>
            </details>
            <details className="p-5">
              <summary className="font-semibold cursor-pointer">Bagaimana cara bergabung dengan Jejak Aksi?</summary>
              <p className="mt-2 text-gray-700">Isi form "Gabung Komunitas", pilih peran, dan ikuti proses onboarding untuk masuk kanal komunikasi.</p>
            </details>
            <details className="p-5">
              <summary className="font-semibold cursor-pointer">Apa yang saya lakukan setelah saya mengisi form untuk bergabung dengan Jejak Aksi?</summary>
              <p className="mt-2 text-gray-700">Tunggu email/WA dari tim untuk arahan awal, jadwal perkenalan, dan rekomendasi aksi mikro pertama yang bisa kamu coba.</p>
            </details>
            <details className="p-5">
              <summary className="font-semibold cursor-pointer">Apakah saya dapat mengajukan kegiatan kolaborasi dengan Jejak Aksi?</summary>
              <p className="mt-2 text-gray-700">Bisa. Ajukan ide kolaborasi melalui kanal komunikasi atau email resmi—kami terbuka pada inisiatif komunitas dan mitra.</p>
            </details>
          </div>
        </section>

        {/* Bagian Form Gabung */}
        <section id="join" aria-labelledby="join-title">
          <h2 id="join-title" className="font-heading text-3xl font-semibold title-accent">Gabung Komunitas Jejak Aksi</h2>
          <p className="mt-2 text-gray-600">Isi data di bawah untuk bergabung.</p>

          <form 
            ref={formRef}
            onSubmit={onSubmit} 
            className="mt-8 grid gap-4"
            noValidate
          >
            <input
              name="Nama"
              id="f_nama"
              type="text"
              placeholder="Nama Lengkap"
              required
              className="rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="Email"
              id="f_email"
              type="email"
              placeholder="Alamat Email"
              required
              className="rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="relative">
              <input
                name="WhatsApp"
                id="f_wa"
                type="tel"
                placeholder="Nomor WhatsApp (contoh: 08123456789)"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <input
              name="Domisili"
              id="f_domisili"
              type="text"
              placeholder="Kota / Domisili"
              required
              className="rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            <select
              name="Peran"
              id="f_peran"
              required
              className="rounded-xl border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Pilih Peran</option>
              <option>Relawan Umum</option>
              <option>Keahlian Tertentu</option>
              <option>Kontributor Cerita</option>
              <option>Mitra Komunitas</option>
            </select>
            
            <label className="flex gap-2 text-sm mt-1 items-center cursor-pointer">
              <input name="Consent" id="f_consent" type="checkbox" required className="w-4 h-4 accent-green-600" />
              <span>Saya setuju dengan kebijakan privasi</span>
            </label>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-rounded btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-30" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="4"/>
                </svg>
              )}
              <span>{loading ? 'Mengirim...' : 'Kirim & Bergabung'}</span>
            </button>
          </form>
          {/* Toast Notifikasi */}
          {toast.message && <Toast message={toast.message} type={toast.type} />}
        </section>
      </div>
    </section>
  )
}