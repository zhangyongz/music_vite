import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useAppSelector } from '@/store/hooks'

import AudioControls from './AudioControls'
import AudioProfile from './AudioProfile'
import './style.less'
import type { artist } from '@/types'
import { selectTracks } from '@/store/features/users/usersSlice'
import { audioSrcPrefix } from '@/commons/const'

interface AudioPlayProps {
  trackIndex: number,
  setTrackIndex: (arg0: number) => void,
  audioRef: React.MutableRefObject<HTMLAudioElement>,
  isPlaying: boolean,
  setIsPlaying: (arg0: boolean) => void,
}

const AudioPlayer: React.FC<AudioPlayProps> = ({
  trackIndex, setTrackIndex, audioRef,
  isPlaying, setIsPlaying
}) => {
  const [trackProgress, setTrackProgress] = useState(0)
  const tracks = useAppSelector(selectTracks)

  const { title, artist, color, image, audioSrc } = useMemo(() => {
    const song = tracks[trackIndex] || {}
    const title = song.name
    const artist = song.ar?.map((item: artist) => {
      return item.name
    }).join(',')
    const color = ''
    const image = song.al?.picUrl
    const audioSrc = audioSrcPrefix + song.id + '.mp3'
    return {
      song, title, artist, color, image, audioSrc
    }
  }, [tracks, trackIndex])

  const intervalRef = useRef<undefined | number>()
  const isReady = useRef(false)

  const { duration, currentTime } = audioRef.current

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%'
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #c4463a), color-stop(${currentPercentage}, #fff))
  `

  const toPrevTrack = useCallback(() => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1)
    } else {
      setTrackIndex(trackIndex - 1)
    }
  }, [tracks, trackIndex, setTrackIndex])

  const toNextTrack = useCallback(() => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1)
    } else {
      setTrackIndex(0)
    }
  }, [tracks, trackIndex, setTrackIndex])

  const startTimer = useCallback(() => {
    intervalRef.current = window.setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack()
      } else {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, 1000)

    return () => { clearInterval(intervalRef.current) }
  }, [toNextTrack, audioRef])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      startTimer()
    } else {
      clearInterval(intervalRef.current)
      audioRef.current.pause()
    }
  }, [isPlaying, audioRef, startTimer])

  useEffect(() => {
    // Pause and clean up on unmount
    const audioRefCur = audioRef.current
    return () => {
      audioRefCur.pause()
      // clearInterval(intervalRef.current)
    }
  }, [audioRef])

  useEffect(() => {
    setTrackIndex(0)
  }, [tracks, setTrackIndex])

  useEffect(() => {
    audioRef.current.pause()

    // audioRef.current = new Audio(audioSrc)
    audioRef.current.src = audioSrc
    setTrackProgress(audioRef.current.currentTime)

    if (isReady.current) {
      audioRef.current.play()
      setIsPlaying(true)
      // startTimer()
    } else {
      isReady.current = true
    }
  }, [trackIndex, tracks, audioRef, audioSrc, setIsPlaying])

  const onScrub = useCallback((value: string) => {
    // Clear any timers already running
    clearInterval(intervalRef.current)
    audioRef.current.currentTime = Number(value)
    setTrackProgress(audioRef.current.currentTime)
  }, [audioRef])

  const onScrubEnd = useCallback(() => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }, [startTimer, isPlaying, setIsPlaying])

  return (
    <div className="audio_player">
      <div className="audio_bar">
        <AudioProfile
          title={title}
          artist={artist}
          image={image}
          color={color}
          duration={duration}
          currentTime={currentTime}
        >
        </AudioProfile>

        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        >
        </AudioControls>

        <div className="right_wrapper"></div>

        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration || `${duration}`}
          className="audio_progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
    </div>
  )
}

export default AudioPlayer
