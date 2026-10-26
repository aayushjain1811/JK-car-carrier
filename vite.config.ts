import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// BASE_PATH lets the site live in a sub-folder, e.g. GitHub Pages: /your-repo-name/
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  // One shared bundle (≈170 kB gzipped) cached across all pages.
  build: { chunkSizeWarningLimit: 700 },
})
