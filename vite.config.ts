import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // For a project site, set base to '/REPOSITORY-NAME/' before deploying.
  // For USERNAME.github.io repositories, keep base as '/'.
  base: '/',
})