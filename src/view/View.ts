import * as PIXI from 'pixi.js'
import 'pixi-sound'
import { render音符 } from './NoteGraphic'
import { GamePresenter } from '../presenter/GamePresenter'
import { 判定, 音符, 音符WithTime, 音符判定結果 } from '../model/音符'
import rawPoing from '../assets/sounds/poing.wav'
import rawPong from '../assets/sounds/pong.wav'
import rawSu from '../assets/sounds/su.wav'

const poingSound = PIXI.sound.Sound.from(rawPoing)
const pongSound = PIXI.sound.Sound.from(rawPong)
const suSound = PIXI.sound.Sound.from(rawSu)

interface 音符WithTimeWithGraphic {
  音符WithTime: 音符WithTime
  graphic?: PIXI.Graphics
  isBeaten: boolean
}

const WIDTH = window.innerWidth - 200

export class View {
  private app: PIXI.Application
  private 音符WithTimeWithGraphics: 音符WithTimeWithGraphic[] = []
  private rootEl: HTMLElement
  private presenter?: GamePresenter

  constructor(rootEl: HTMLElement) {
    this.rootEl = rootEl
    this.app = new PIXI.Application({
      width: WIDTH,
      height: 256,
      antialias: true,
      resolution: 2,
      autoResize: false,
      backgroundColor: 0xffffff,
    })
  }

  public inject(presenter: GamePresenter) {
    this.presenter = presenter
  }

  public async ready(): Promise<void> {
    this.registerKeyEvent()
    this.ready譜面()
  }

  private ready譜面() {
    const { song } = this.presenter!

    for (const key in this.presenter!.song.譜面) {
      this.音符WithTimeWithGraphics.push({
        音符WithTime: song.譜面[key],
        graphic: render音符(song.譜面[key].音符),
        isBeaten: false,
      })
    }
  }

  public render() {
    this.rootEl.appendChild(this.app.view)

    this.音符WithTimeWithGraphics.forEach((n) => {
      if (n.graphic != null) {
        this.app.stage.addChild(n.graphic)
      }
    })

    this.renderBeatGuide()

    this.app.ticker.add(() => {
      this.presenter!.onUpdate()
    })
  }

  public show音符判定結果(音符判定結果: 音符判定結果): void {
    this.音符WithTimeWithGraphics = this.音符WithTimeWithGraphics.map((o) => {
      if (o.音符WithTime.id === 音符判定結果.id) {
        return {
          ...o,
          isBeaten: true,
        }
      }

      return o
    })

    switch (音符判定結果.判定) {
      case 判定.Best:
        {
          const resultText = new PIXI.Text('Success', {
            fill: '#000000',
          })

          resultText.x = 10
          resultText.y = 100

          this.app.ticker.add((delta) => {
            resultText.y -= 0.4 + delta
            resultText.alpha -= 0.04 * delta

            if (resultText.alpha < 0) {
              this.app.stage.removeChild(resultText)
            }
          })

          this.app.stage.addChild(resultText)
        }
        break
      case 判定.Bad: {
        const resultText = new PIXI.Text('Miss!', {
          fill: '#ff0000',
        })

        resultText.x = 10
        resultText.y = 100

        this.app.ticker.add((delta) => {
          resultText.y -= 0.4 + delta
          resultText.alpha -= 0.04 * delta

          if (resultText.alpha < 0) {
            this.app.stage.removeChild(resultText)
          }
        })

        this.app.stage.addChild(resultText)
      }
    }
  }

  public update(): void {
    this.updateCircle()
  }

  public play音符(note: 音符) {
    switch (note) {
      case 音符.Poing:
        poingSound.play()
        break
      case 音符.Pong:
        pongSound.play()
        break
      case 音符.Su:
        suSound.play()
        break
    }
  }

  private updateCircle(): void {
    this.音符WithTimeWithGraphics.forEach((n) => {
      if (n.graphic != null && n.isBeaten) {
        this.app.stage.removeChild(n.graphic)
      } else if (n.graphic != null) {
        n.graphic.x =
          WIDTH + n.音符WithTime.time * 10 - this.presenter!.elapsedMs * 10
      }
    })
  }

  private renderBeatGuide(): void {
    const graphic = new PIXI.Graphics()
    graphic.beginFill(0x00ffff)
    graphic.drawCircle(0, 0, 32)
    graphic.endFill()

    graphic.x = 100
    graphic.y = 100

    this.app.stage.addChild(graphic)
  }

  private registerKeyEvent = (): void => {
    document.addEventListener('keypress', (event) => {
      this.presenter!.onKeyPress(event.key)
    })
  }
}
