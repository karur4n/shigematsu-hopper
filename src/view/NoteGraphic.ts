import { 音符 } from '../model/音符'

export function render音符(音符: 音符) {
  const graphic = new PIXI.Graphics()
  graphic.beginFill(getColor(音符))
  graphic.drawCircle(0, 100, 32)
  graphic.endFill()

  return graphic
}

function getColor(note: 音符): number {
  switch (note) {
    case 音符.Su:
      return 0x000000
    case 音符.Poing:
      return 0xf00fff
    case 音符.Pong:
      return 0xfff00f
  }
}
