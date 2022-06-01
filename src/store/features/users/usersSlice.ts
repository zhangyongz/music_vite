import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import tracks from '@/assets/data/tracks'
import { ProfileInterface, track } from '@/types/index'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    profile: {
      userId: '',
      avatarUrl: '',
      nickname: ''
    },
    tracks,
    lyricShow: false,
    loginShow: false
  },
  reducers: {
    setProfile: (state, action) => {
      // console.log(action.payload);
      state.profile = action.payload
    },
    setTracks: (state, action) => {
      state.tracks = action.payload
    },
    setLyricShow: (state, action) => {
      state.lyricShow = action.payload
    },
    setLoginShow: (state, action) => {
      state.loginShow = action.payload
    }
  }
})

export const { setProfile, setTracks, setLyricShow, setLoginShow } = usersSlice.actions

export const selectProfile = (state: RootState): ProfileInterface => state.users.profile
export const selectUid = (state: RootState): string => state.users.profile.userId
export const selectTracks = (state: RootState): track[] => state.users.tracks
export const selectLyricShow = (state: RootState): boolean => state.users.lyricShow
export const selectLoginShow = (state: RootState): boolean => state.users.loginShow

export default usersSlice.reducer
