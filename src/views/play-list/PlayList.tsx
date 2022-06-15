import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Spin } from 'antd'

import List from '@/components/list/List'
import PlayBtn from '@/components/play-btn/PlayBtn'
import { useAppDispatch } from '@/store/hooks'
import { playlistDetail, playlistTrack } from '@/commons/api'
import { setTracks } from '@/store/features/users/usersSlice'
import './playList.less'
import { playListInfoInterface } from '@/types'

const PlayList: React.FC = () => {
  const [listData, setListData] = useState([])
  const [info, setInfo] = useState<playListInfoInterface>({
    coverImgUrl: '',
    name: '',
    tags: [],
    description: ''
  })
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)

  // init
  const id = searchParams.get('id')
  const getPlaylistDetail = useCallback(() => {
    return playlistDetail({
      id
    })
  }, [id])
  const getPlaylistTrack = useCallback(() => {
    return playlistTrack({
      id
    })
  }, [])
  const init = useCallback(async () => {
    setLoading(true)
    const res = await Promise.all([getPlaylistDetail(), getPlaylistTrack()])
    setLoading(false)
    if (res[0].code === 200 && res[1].code === 200) {
      setInfo(res[0].playlist)
      setListData(res[1].songs)
    }
  }, [])

  useEffect(() => {
    init()
  }, [])

  const handleClick = useCallback(() => {
    dispatch(setTracks(listData))
  }, [listData, dispatch])

  return (
    <div className="play_list_box">
      <Spin spinning={loading}>
        <div className="pannel">
          <img src={info.coverImgUrl} alt="coverImg" className="img" />
          <div className="info">
            <p className="info_name">
              <span className="info_name_label">歌单</span>
              <span className="info_name_text">{info.name}</span>
            </p>
            {/* <p className='total_text'>共{listData.length}首</p> */}
            <PlayBtn onClick={handleClick} className="info_btn"></PlayBtn>
            <p className="info_tag">
              <span className="info_tag_label">标 签: </span>
              <span className="info_tag_text">{info.tags.join(' / ')}</span>
            </p>
            <p className="info_desc">
              <span className="info_desc_label">简 介: </span>
              <span className="info_desc_text">{info.description}</span>
            </p>
          </div>
        </div>

        <List data={listData}></List>
      </Spin>
    </div>
  )
}

export default PlayList
