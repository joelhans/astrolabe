export type Star = {
  title: string
  author: string
  authorBio: string
  publishedOn: string
  summary: string
  declination: number
  ascension: number
  size: number
  asterism: string
  astrismFull: string
  linkedTo: string
  tags: string[]
}

export type StarLink = {
  asterism?: string
  source: string
  sourceX?: number
  sourceY?: number
  target: string
  targetX?: number
  targetY?: number
}

export type Post = {
  [x: string]: any
  artworkUrl?: string
  ascension?: number
  asterism?: string
  asterismFull?: string
  author?: string
  authorBio?: string
  color?: string
  declination?: number
  gradient?: any
  id: string
  linkedTo?: string[]
  publishedOn?: string
  size?: number
  slug: string
  summary?: string
  tags?: string[]
  title: string
  visited?: boolean
  key?: string
  orbit?: any
}

export type Asterism = { key: string; values: any; value: undefined }
