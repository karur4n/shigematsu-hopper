import { View } from '../view/View'
import { Song, 判定, 音符 } from '../model/音符'

export class GamePresenter {
  public elapsedMs: number
  public song: Song

  private lastDate: Date
  private view?: View

  constructor(song: Song) {
    this.song = song
    this.elapsedMs = 0

    this.lastDate = new Date()
  }

  public inject(view: View) {
    this.view = view
  }

  public onUpdate() {
    const now = new Date()
    this.elapsedMs = (now.getTime() - this.lastDate.getTime()) / 100

    this.view!.update()
  }

  public onKeyPress(key: string): void {
    switch (key) {
      case 'a':
        this.view!.play音符(音符.Poing)
        break
      case 's':
        this.view!.play音符(音符.Pong)
        break
      case 'd':
        this.view!.play音符(音符.Su)
        break
      default:
    }

    for (const id in this.song.譜面) {
      console.log(this.song.譜面[id].time + 82, this.elapsedMs)

      if (
        this.song.譜面[id].time + 82 < this.elapsedMs + 4 &&
        this.song.譜面[id].time + 82 > this.elapsedMs - 4
      ) {
        this.view!.show音符判定結果({
          id: id,
          判定: 判定.Best,
        })

        return undefined
      }
    }

    this.view!.show音符判定結果({
      id: undefined,
      判定: 判定.Bad,
    })

    return undefined
  }
}
