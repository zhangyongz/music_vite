import type { Plugin } from 'vite'
import * as path from 'path'
import * as fs from 'fs'

const localPath = path.resolve(process.cwd(), './src/locales')

function getRaw (item: string) {
  const filePath = path.resolve(localPath, item)
  return fs.readFileSync(filePath, { encoding: 'utf-8' })
}

const BUNDLE_IMPORT_ID = 'vite-plugin-react-i18n/messages'

function gennerateBundleResources () {
  const codes = []
  const files = fs.readdirSync(localPath)
  files.forEach((item) => {
    const { name } = path.parse(item)
    const source = getRaw(item)
    codes.push(`${JSON.stringify(name)}:${source}`)
  })

  return `export default {
    ${codes.join(',\n')}
  }`
}

function reactI18n (): Plugin {
  return {
    name: 'vite-plugin-react-i18n',

    resolveId (id: string) {
      if (id === BUNDLE_IMPORT_ID) {
        return id
      }
    },

    load (id: string) {
      if (id === BUNDLE_IMPORT_ID) {
        const codes = gennerateBundleResources()
        return Promise.resolve(codes)
      }
    }
  }
}

export { reactI18n }
