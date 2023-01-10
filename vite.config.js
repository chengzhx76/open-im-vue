import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue']
  },
  base: '',
  publicPath: '',
  server: {
    port: 8081,
    proxy: {
      '/umf': {
        // target: 'http://localhost:8091/chat,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/chat/, '')
      }
    }
  }
})
