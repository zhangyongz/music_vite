import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { getTopList } from '@/commons/api'
import { playListType, playListItemInterface } from '@/types'
import './rank.less'

const Rank: React.FC = () => {
  const navigate = useNavigate()

  const [playList, setplayList] = useState<playListType>([])

  const getList = useCallback(async () => {
    const res = await getTopList()
    if (res.code === 200) {
      // console.log(res);
      setplayList(res.playlists)
    }
  }, [])

  const clickHandle = useCallback((item: playListItemInterface) => {
    navigate('/play-list?id=' + item.id)
  }, [navigate])

  useEffect(() => {
    getList()
  }, [getList])

  return (
    <div className="rank_list">
      <ul className="collection_wrapper">
        {playList.map((item) => {
          return <li className="collection_item" key={item.id} onClick={() => { clickHandle(item) }}>
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt="" className="img" />
            </div>
            <p className="text">{item.name}</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default Rank
