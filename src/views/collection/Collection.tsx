import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'

import { userPlaylist } from '@/commons/api'
import { selectUid } from '@/store/features/users/usersSlice'
import { playListType, playListItemInterface } from '@/types'
import './collection.less'

const Collection: React.FC = () => {
  const navigate = useNavigate()

  const uid = useAppSelector(selectUid)
  const [playList, setplayList] = useState<playListType>([])

  const getList = useCallback(async () => {
    if (!uid) {
      return
    }
    const res = await userPlaylist({
      uid,
      limit: '100'
    })
    if (res.code === 200) {
      // console.log(res);
      setplayList(res.playlist)
    }
  }, [uid])

  const clickHandle = useCallback((item: playListItemInterface) => {
    navigate('/play-list?id=' + item.id)
  }, [navigate])

  useEffect(() => {
    getList()
  }, [getList])

  return (
    <div className="collection_box">
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

export default Collection
