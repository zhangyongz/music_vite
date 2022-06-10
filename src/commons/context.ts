import React from 'react'

export const LoadingContext = React.createContext({
  toggleLoading: (val: boolean) => {}
})

export const LocaleContext = React.createContext({
  locale: 'en',
  setLocale: (val: string) => {},
  t: (msg: string): string => {
    return ''
  },
  i18n: []
})
