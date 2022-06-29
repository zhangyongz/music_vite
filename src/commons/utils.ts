import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

export const formatSecond = (second: number): string => {
  if (isNaN(second)) {
    return '00:00'
  }
  return dayjs.duration(second, 'second').format('mm:ss')
}

export const formatMilliSecond = (milliSecond: number): string => {
  if (isNaN(milliSecond)) {
    return '00:00'
  }
  return dayjs.duration(milliSecond, 'millisecond').format('mm:ss')
}

export const scrollTopTo = (dom: HTMLDivElement, top: number): void => {
  let scrollTop = dom.scrollTop
  const direction = scrollTop - top > 0 ? 'down' : 'up'
  function recursion () {
    if (direction === 'up' && scrollTop >= top) {
      return
    }
    if (direction === 'down' && scrollTop <= top) {
      return
    }
    dom.scrollTop = direction === 'up' ? ++scrollTop : --scrollTop
    setTimeout(() => {
      recursion()
    }, 10)
  }
  if (Math.abs(scrollTop - top) > 100) {
    dom.scrollTop = top
  } else {
    recursion()
  }
}
