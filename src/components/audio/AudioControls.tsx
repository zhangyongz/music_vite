import React from 'react'
import {
  StepBackwardFilled,
  StepForwardFilled,
  PlayCircleFilled,
  PauseCircleFilled
} from '@ant-design/icons'

interface AudioControlsProps {
  isPlaying: boolean,
  onPlayPauseClick: (val: boolean) => void,
  onPrevClick: () => void,
  onNextClick: () => void,
  children?: React.ReactNode
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick
}) => {
  return (
    <div className="audio_controls">
      <button
        type="button"
        className="prev"
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <StepBackwardFilled style={{ fontSize: '24px' }} />
      </button>
      {isPlaying
        ? (
        <button
          type="button"
          className="pause"
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          <PauseCircleFilled style={{ fontSize: '34px' }} />
        </button>
          )
        : (
        <button
          type="button"
          className="play"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <PlayCircleFilled style={{ fontSize: '34px' }} />
        </button>
          )}
      <button
        type="button"
        className="next"
        aria-label="Next"
        onClick={onNextClick}
      >
        <StepForwardFilled style={{ fontSize: '24px' }} />
      </button>
    </div>
  )
}

export default AudioControls
