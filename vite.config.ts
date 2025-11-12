import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [svelte()],
  // Use base path only for production builds (GitHub Pages)
  // In dev mode, serve from root for easier local development
  base: command === 'build' ? '/w3c-a11y-maturity-model/' : '/',
  build: {
    outDir: 'dist',
  }
}))
