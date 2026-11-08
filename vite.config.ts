import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [svelte()],
  // Use base path only for production builds (GitHub Pages)
  // In dev mode, serve from root for easier local development
  base: command === 'build' ? '/w3c-a11y-maturity-model/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Two real pages, so each is reachable as a file on GitHub Pages
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        tool: fileURLToPath(new URL('./tool.html', import.meta.url)),
      },
    },
  }
}))
