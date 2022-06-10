import React, { useContext, useCallback } from 'react'
import { Select } from 'antd'

import { LocaleContext } from '@/commons/context'

const { Option } = Select

interface Props {

}

const LocaleSelect: React.FC<Props> = () => {
  // i18n
  const { locale, setLocale, i18n } = useContext(LocaleContext)
  const handleLocaleChange = useCallback((value: string) => {
    setLocale(value)
  }, [])

  return (
    <Select defaultValue={locale} onChange={handleLocaleChange} size="small"
      className='menu_select' placement="topLeft">
      {Object.keys(i18n).map((item) => {
        return (
          <Option value={item} key={item}>{item}</Option>
        )
      })}
    </Select>
  )
}

export default LocaleSelect
