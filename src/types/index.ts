export interface artist {
  name: string
}

export interface track {
  // song: {
  id: number,
  name: string,
  ar: artist[],
  al: {
    name: string,
    picUrl: string
  },
  dt: number,
  // }
}

export interface playListItemInterface {
  id: number,
  coverImgUrl: string,
  name: string
}

export type playListType = playListItemInterface[]

export interface playListInfoInterface {
  coverImgUrl: string,
  name: string,
  tags: [],
  description: string
}

export interface ProfileInterface {
  userId: string,
  avatarUrl: string,
  nickname: string
}