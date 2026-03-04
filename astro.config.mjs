import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap'; // Ini otomatis ada stlh install

export default defineConfig({
  // PENTING: Ganti dengan domain asli kamu (harus https)
  site: 'https://jejakaksi.com', 
  
  integrations: [
    react(), 
    tailwind({ applyBaseStyles: false }),
    sitemap() // Ini otomatis ada stlh install
  ],
});