export enum 音符 {
  Pong,
  Poing,
  Su,
}

export interface 音符WithTime {
  id: string
  音符: 音符
  time: number
}

export type 譜面 = {
  [key: string]: 音符WithTime
}

export interface Song {
  id: string
  title: string
  譜面: 譜面
}

export enum 判定 {
  Best,
  Good,
  Bad,
}

export interface 音符判定結果 {
  id?: string
  判定: 判定
}

export type Song判定結果 = Array<音符判定結果>
