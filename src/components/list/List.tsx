import React from 'react'
import { Affix } from 'antd'

import './list.less'
import { formatMilliSecond } from '@/commons/utils'
import { useAppDispatch } from '@/store/hooks'
import { setTracks } from '@/store/features/users/usersSlice'
import type { track } from '@/types'

interface ListProps {
  data: track[]
}

const List: React.FC<ListProps> = (props) => {
  const dispatch = useAppDispatch()

  function clickItemHandle (item: track) {
    dispatch(setTracks([item]))
  }

  return (
    <div className="list_box">
      <ul>
        <Affix offsetTop={0}>
          <li className="list_item list_title">
            <span className="name">音乐标题</span>
            <span className="ar">歌手</span>
            <span className="al">专辑</span>
            <span className="time">播放时间</span>
          </li>
        </Affix>
        {
          props.data.map((item) => {
            return (<li key={item.id} className="list_item"
              onClick={() => { clickItemHandle(item) }}>
              <span className="name">{item.name}</span>
              <span className="ar">{item.ar.map((item, index) => {
                const symbol = index === 0 ? '' : ' / '
                return symbol + item.name
              })}</span>
              <span className="al">{item.al.name}</span>
              <span className="time">{formatMilliSecond(item.dt)}</span>
            </li>)
          })
        }
      </ul>
    </div>
  )
}

export default List
