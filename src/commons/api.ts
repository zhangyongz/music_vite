// import { AxiosResponse } from 'axios'
import http from '@/commons/http'

type res = any

export function qrKey (): Promise<res> {
  return http.get('/login/qr/key')
}

interface qrCreateParams {
  key: string,
  qrimg?: string
}

export function qrCreate (params: qrCreateParams): Promise<res> {
  return http.get('/login/qr/create', {
    params
  })
}

interface qrCheckParams {
  key: string,
}

export function qrCheck (params: qrCheckParams): Promise<res> {
  return http.get('/login/qr/check', {
    params
  })
}

// 获取账号信息
export function userAccount (): Promise<res> {
  return http.get('/user/account')
}

interface userIdParams {
  uid: string
}

// 获取用户详情
export function userDetail (params: userIdParams): Promise<res> {
  return http.get('/user/detail', {
    params
  })
}

interface userRecordParams {
  uid: string,
  type?: string
}

export function userRecord (params: userRecordParams): Promise<res> {
  return http.get('/user/record', {
    params
  })
}

interface songUrlParams {
  id: string,
  br?: string
}

export function songUrl (params: songUrlParams): Promise<res> {
  return http.get('/song/url', {
    params
  })
}

interface userPlaylistParams extends userIdParams {
  limit?: string
}

// 获取用户歌单
export function userPlaylist (params: userPlaylistParams): Promise<res> {
  return http.get('/user/playlist', {
    params
  })
}

interface playlistDetailParams {
  id: string | null,
  s?: string
}

export function playlistDetail (params: playlistDetailParams): Promise<res> {
  return http.get('/playlist/detail', {
    params
  })
}

export function playlistTrack (params: playlistDetailParams): Promise<res> {
  return http.get('/playlist/track/all', {
    params
  })
}

interface getLyricParams {
  id: string
}

// 获取歌词
export function getLyric (params: getLyricParams): Promise<res> {
  return http.get('/lyric', {
    params
  })
}

// 歌单 ( 网友精选碟 )
export function getTopList (): Promise<res> {
  return http.get('/top/playlist/highquality')
}
