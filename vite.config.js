import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/img/**/*',
          dest: 'assets/img'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Giữ nguyên tên file cho ảnh
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|ico)$/i.test(assetInfo.name)) {
            return 'assets/img/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.ico'],
  ssr: {
    noExternal: ['vuetify'],
    external: ['@vueup/vue-quill', 'quill']
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onBeforePageRender(route, indexHTML, appCtx) {
      // Skip SSR for business routes (they use Quill which requires document)
      if (route.startsWith('/business')) {
        return false
      }
    },
    includedRoutes(paths) {
      // Pre-render all blog post routes
      const blogRoutes = [
        '/blog/lam-viec-nhom-trong-moi-truong-agency-teamwork',
        '/blog/marketing-2026-xu-huong-moi-dinh-hinh-tuong-lai-thuong-hieu',
        '/blog/quoc-khanh-2-9-2025-xu-huong-hot',
        '/blog/meme-marketing-6-nguyen-tac',
        '/blog/google-ai-overview-seo-2025',
        '/blog/pr-su-kien-dac-biet-thuong-hieu-quoc-gia',
        '/blog/5-kenh-goi-von-startup',
        '/blog/bi-quyet-tiep-can-nha-dau-tu',
        '/blog/muc-tieu-tang-truong-b2b',
        '/blog/7p-marketing-nganh-dich-vu',
        '/blog/tiep-thi-san-pham-cong-nghiep',
        '/blog/marketing-2025-chien-luoc',
        '/blog/chien-dich-quang-cao-startup-cong-nghe',
        '/blog/chatgpt-cong-cu-ai-duoc-nguoi-viet-ua-chuong-2025',
        '/blog/tuong-lai-agency-sang-tao-ai-2030',
        '/blog/matecom-ho-tro-hti-scientific-hoi-thao-2025',
        '/blog/matecom-ho-tro-hti-scientific-trien-lam-2025',
        '/blog/matecom-goi-fpters-tra-loi-checkin-2025',
        '/blog/matecom-agency-hop-tac-genzhome-2025'
      ]
      // Only include blog routes, exclude business routes
      return blogRoutes
    }
  }
})
