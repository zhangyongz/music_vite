import React, { useState, useRef, useCallback, useContext, useMemo, useReducer } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {
  ClockCircleOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  LikeOutlined
} from '@ant-design/icons'
import { Spin, message } from 'antd'
import i18n from 'vite-plugin-react-i18n/messages'

import './App.less'
import AudioPlayer from './components/audio/AudioPlayer'
import Lyric from './components/lyric/Lyric'

import { LoadingContext, LocaleContext } from '@/commons/context'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectProfile, selectTracks, selectLoginShow, setLoginShow } from '@/store/features/users/usersSlice'
import { audioSrcPrefix } from '@/commons/const'

import LoginModal from '@/components/login-modal/LoginModal'

const AudioMenuComponent: React.FC = () => {
  const profile = useAppSelector(selectProfile)

  const dispatch = useAppDispatch()
  const loginShow = useAppSelector(selectLoginShow)
  const loginHandle = useCallback(() => {
    dispatch(setLoginShow(true))
  }, [dispatch])

  const setVisibleHandle = useCallback((val: boolean) => {
    dispatch(setLoginShow(val))
  }, [dispatch])

  // i18n
  const { t } = useContext(LocaleContext)

  return (
    <div className="audio_menu">
        {
          profile.userId
            ? <div className="menu_avatar" onClick={loginHandle}>
              <img src={profile.avatarUrl} alt="avatar" className="avatar" />
              <p className="username">{profile.nickname}</p>
            </div>
            : <div className="menu_avatar" onClick={loginHandle}>
              <UserOutlined style={{ fontSize: '30px' }} />
              <p className="username">未登录</p>
            </div>
        }
      <ul className="menu_list">
        <li className="list_item">
          <NavLink to="/"
            className={({ isActive }) =>
              isActive ? 'active link' : 'link'
            }>
            <LikeOutlined style={{ fontSize: '20px' }} />
            <span className="text">{t('rank')}</span>
          </NavLink>
        </li>
        <li className="list_item">
          <NavLink to="record"
            className={({ isActive }) =>
              isActive ? 'active link' : 'link'
            }>
            <ClockCircleOutlined style={{ fontSize: '20px' }} />
            <span className="text">{t('record')}</span>
          </NavLink>
        </li>
        <li className="list_item">
          <NavLink to="collection"
            className={({ isActive }) =>
              isActive ? 'active link' : 'link'
            }>
            <CustomerServiceOutlined style={{ fontSize: '20px' }} />
            <span className="text">{t('collection')}</span>
          </NavLink>
        </li>
      </ul>

      <LoginModal visible={loginShow} setVisible={setVisibleHandle}></LoginModal>
    </div >
  )
}

const AudioMenu = React.memo(AudioMenuComponent)

const App: React.FC = () => {
  // loading
  const [loading, setLoading] = useState(false)
  const loadingContextValue = {
    toggleLoading: (val: boolean) => {
      setLoading(val)
    }
  }

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
  const { locale, setLocale, t } = useI18n()
  const localeContextValue = { i18n, locale, setLocale, t }

  // track
  const tracks = useAppSelector(selectTracks)
  const [trackIndex, setTrackIndex] = useState(0)
  const song = tracks[trackIndex] || {}
  const audioSrc = audioSrcPrefix + song.id + '.mp3'
  const audioRef = useRef(new Audio(audioSrc))
  audioRef.current.onerror = () => {
    message.warning({
      content: '当前音乐不可播放，已自动播放下一曲',
      duration: 1
    })

    setTrackIndex((trackIndex) => {
      return trackIndex + 1
    })
  }
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <Spin spinning={loading}>
          <div className="App">
            <AudioMenu></AudioMenu>
            <AudioPlayer trackIndex={trackIndex} setTrackIndex={setTrackIndex}
              audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying}></AudioPlayer>
            <Lyric trackIndex={trackIndex} audioRef={audioRef} isPlaying={isPlaying}></Lyric>
            <div className="container">
              <Outlet />
            </div>
          </div>
        </Spin>
      </LocaleContext.Provider>
    </LoadingContext.Provider>
  )
}

export default App
