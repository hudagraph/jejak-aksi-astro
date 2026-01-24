# Jejak Aksi - Astro Project

Website komunitas Jejak Aksi yang dibangun menggunakan **Astro**, **React**, dan **Tailwind CSS**. Website ini dirancang untuk performa tinggi dengan arsitektur "Island Architecture" dan manajemen konten berbasis Markdown (Decap CMS).

## 🚀 Fitur Utama

-   **Statis & Cepat:** Dibangun dengan Astro untuk performa maksimal.
-   **CMS Terintegrasi:** Menggunakan Decap CMS (Netlify CMS) untuk manajemen artikel, proyek, dan karya.
-   **Responsive Design:** Tampilan mobile-friendly dengan Tailwind CSS.
-   **Conditional Rendering:** Section (Proyek, Karya, Belajar, Cerita) hanya muncul jika data tersedia.
-   **Dynamic Routing:** Halaman detail (`[slug]`) dibuat otomatis dari file Markdown.
-   **Form Handling:** Terintegrasi dengan Netlify Forms untuk pendaftaran relawan.

## 🛠️ Tech Stack

-   **Framework:** Astro v5
-   **UI Library:** React (untuk komponen interaktif seperti Card & Modal)
-   **Styling:** Tailwind CSS + Typography Plugin
-   **Animation:** Framer Motion
-   **CMS:** Decap CMS (Git-based)

## 📂 Struktur Project Baru

Perubahan arsitektur (Januari 2026): Logic pengambilan data dipusatkan di `index.astro` (Parent) dan dioper ke komponen (Child) via props.

```text
src/
├── components/
│   ├── react/         # Komponen React (Proyek, Karya, FAQ) - "Dumb Components"
│   ├── Cerita.astro   # Komponen Tampilan Cerita (menerima props data)
│   └── Belajar.astro  # Komponen Tampilan Belajar (menerima props data)
├── content/           # Sumber data Markdown (CMS)
│   ├── proyek/
│   ├── karya/
│   ├── belajar/
│   └── cerita/
├── pages/
│   ├── index.astro    # Halaman Utama (Logic Fetching Data ada di sini)
│   ├── [kategori]/    # Folder halaman arsip (proyek, karya, dll)
│   └── [slug].astro   # Template halaman detail
└── layouts/           # Layout utama (Navbar + Footer)