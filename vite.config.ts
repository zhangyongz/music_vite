/* eslint-disable brace-style */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import * as path from 'path'
import * as fs from 'fs'
import lessToJS from 'less-vars-to-js'
import { reactI18n } from './plugins/vite-plugin-react-i18n'
import { removePreloads } from './plugins/vite-plugin-remove-preloads'
import commpressPlugin from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8')
)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: mode === 'development' ? '/' : '/music-app/',
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
          modifyVars: themeVariables
        }
      }
    },

    resolve: {
      alias: [
        { find: /^@\//, replacement: `${path.resolve(__dirname, './src')}/` }
        // { find: 'react', replacement: 'https://unpkg.com/react@18.2.0/umd/react.production.min.js' }
        // { find: 'react-dom', replacement: 'https://cdn.skypack.dev/react-dom@18' }
      ]
    },

    build: {
      // sourcemap: true,
      // minify: false,
      rollupOptions: {
        // external: ['react', 'react-dom'],

        output: {
          // globals: {
          //   react: 'React',
          //   'react-dom': 'ReactDOM'
          // },
          manualChunks (id, { getModuleInfo }) {
            if (id.includes('node_modules')) {
              // if (id.includes('react/jsx-runtime')) {
              //   console.log(1111)
              // }
              return 'vendor'
            }
            if (
              // 分manifest包，解决chunk碎片问题
              (getModuleInfo(id).importers.length + getModuleInfo(id).dynamicImporters.length > 1 && id.includes('src'))
            ) {
              // if (id.includes('react/jsx-runtime')) {
              //   console.log(222)
              //   console.log(getModuleInfo(id).importers)
              // }
              return 'manifest'
            }
          }
        }
      }
    },

    plugins: [
      react(),
      reactI18n(),
      removePreloads(),
      vitePluginImp({
        optimize: true,
        libList: [
          {
            libName: 'antd',
            libDirectory: 'es',
            style: (name) => `antd/es/${name}/style`
          }
        ]
      }),
      commpressPlugin({
        verbose: true, // 默认即可
        disable: false, // 开启压缩(不禁用)，默认即可
        deleteOriginFile: false, // 删除源文件
        threshold: 10240, // 压缩前最小文件大小
        algorithm: 'gzip', // 压缩算法
        ext: '.gz' // 文件类型
      }),
      visualizer()
    ]
  }
})
