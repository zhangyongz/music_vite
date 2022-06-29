import type { Plugin } from 'vite'

function removePreloads (): Plugin {
  return {
    name: 'vite-plugin-remove-preloads',
    transformIndexHtml (html) {
      // 替换manifest的 modulepreload 导入方式
      let replacedStr = html.replace(
        /<link rel="(?:module)?preload" href=(.*)?>/gi,
        (match, p1) => {
          if (p1.includes('manifest')) {
            return `<script type="module" crossorigin src=${p1}></script>`
          }

          return match
        }
      )

      // 找到index模块
      const reg = /<script type="module" crossorigin src=.*index.*><\/script>/gi
      let indexScript = ''
      replacedStr = replacedStr.replace(
        reg,
        (match, p1) => {
          indexScript = match
          return ''
        }
      )

      // index模块插入到css资源之前
      return replacedStr.replace(
        /(<link rel="stylesheet" href=.*>)/i,
        `${indexScript}\n$1`
      )
    }
  }
}

export { removePreloads }
