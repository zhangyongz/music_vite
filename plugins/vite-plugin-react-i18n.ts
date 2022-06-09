import type { Plugin } from 'vite'
import * as path from 'path'
import * as fs from 'fs'
import { useState } from 'react'

const localPath = path.resolve(process.cwd(), './src/locales')
const i18n = {}

function readDir () {
  fs.readdir(localPath, function (err, files) {
    if (err) throw err
    console.log(files)
    files.forEach((item) => {
      readFile(item)
    })
  })
}

function readFile (item: string) {
  const filePath = path.resolve(localPath, item)
  const fileName = item.split('.')[0]
  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err
    i18n[fileName] = JSON.parse(data)
  })
}

function reactI18n (): Plugin {
  readDir()
  // const url = path.resolve(process.cwd(), './src/locales/cn.json')
  // let en = {}
  // fs.readFile(url, { encoding: 'utf-8' }, (err, data) => {
  //   if (err) {
  //     throw (err)
  //   }
  //   en = JSON.parse(data)
  //   console.log(en)
  // })

  return {
    name: 'vite-plugin-react-i18n'
  }
}

function useI18n () {
  const [locale, setLocale] = useState('en')
  const t = (msg: string) => {
    return i18n[locale][msg]
  }

  return { locale, setLocale, t }
}

export { reactI18n, useI18n }
