import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, mkdirSync } from 'fs'

const BUILD_ID = String(Date.now())

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'emit-version',
      closeBundle() {
        try { mkdirSync('dist', { recursive: true }); writeFileSync('dist/version.json', JSON.stringify({ v: BUILD_ID })) } catch (e) {}
      },
    },
  ],
  define: { __BUILD_ID__: JSON.stringify(BUILD_ID) },
})
