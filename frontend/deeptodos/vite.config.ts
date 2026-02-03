import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite';
import Layouts from 'vite-plugin-vue-layouts'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      // 可选配置示例
      routesFolder: 'src/pages',        // 页面文件目录（默认 src/pages）
      extensions: ['.vue'],             // 支持的文件扩展名
      dts: './src/typed-router.d.ts',   // 类型声明文件输出路径
      exclude: ['**/components/**'],    // 排除不生成路由的文件
    }),
    Layouts({
      layoutsDirs: 'src/layouts', // 布局文件目录，默认为 'src/layouts'
      defaultLayout: 'default' // 默认布局文件名（不含后缀），默认为 'default'
    }),
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    svgLoader(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 此处配置后，项目中的所有 .vue 文件都可以直接使用这些变量，无需再次导入
        additionalData: `
          @use "@/assets/styles/_fonts.scss" as *;
          @use "@/assets/styles/_base.scss" as *;
          @use "@/assets/styles/_variables.scss" as *;
          @use "@/assets/styles/_utilities.scss" as *;
          @use "@/assets/styles/_mixins.scss" as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
