import type { Plugin } from 'vite'

function removePreloads (): Plugin {
  return {
    name: 'vite-plugin-remove-preloads',
    transformIndexHtml (html) {
      let replacedStr = html.replace(
        /<link rel="(?:module)?preload" href=(.*)?>/gi,
        (match, p1) => {
          if (p1.includes('manifest') || p1.includes('vendor')) {
            return `<script type="module" crossorigin src=${p1}></script>`
          }

          return match
        }
      )

      const reg = /<script type="module" crossorigin src=.*index.*><\/script>/gi
      let indexScript = ''
      replacedStr = replacedStr.replace(
        reg,
        (match, p1) => {
          indexScript = match
          return ''
        }
      )

      return replacedStr.replace(
        /(<link rel="stylesheet" href=.*>)/i,
        `${indexScript}\n$1`
      )
    }
  }
}

export { removePreloads }
