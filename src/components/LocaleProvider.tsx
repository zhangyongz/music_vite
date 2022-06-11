import React, { useReducer, useMemo, useCallback } from 'react'
import i18n from 'vite-plugin-react-i18n/messages'

import { LocaleContext } from '@/commons/context'

interface LocaleAction {
  type: 'toggle',
  value: string
}

// i18n
const useI18n = () => {
  const localeVal = localStorage.getItem('locale') || 'en'
  // const [locale, setLocale] = useState(localeVal)
  const [locale, dispatchLocale] = useReducer((state: string, action: LocaleAction) => {
    switch (action.type) {
      case 'toggle':
        localStorage.setItem('locale', action.value)
        return action.value
      default:
        throw new Error()
    }
  }, localeVal)

  const t = (msg: string) => {
    return useMemo(() => {
      return i18n[locale][msg]
    }, [locale, msg])
  }

  const setLocale = useCallback((value: string) => {
    dispatchLocale({
      type: 'toggle',
      value
    })
  }, [])

  return { locale, setLocale, t }
}

interface Props {
  children?: React.ReactNode
}

const LocaleProvider: React.FC<Props> = ({ children }) => {
  const { locale, setLocale, t } = useI18n()
  const localeContextValue = { i18n, locale, setLocale, t }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleProvider
