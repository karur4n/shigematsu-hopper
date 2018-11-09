import { View } from './view/View'
import { GamePresenter } from './presenter/GamePresenter'
import { Song, 譜面, 音符 } from './model/音符'

document.addEventListener('DOMContentLoaded', async () => {
  const rootEl = document.getElementById('root')

  if (rootEl) {
    const presenter = new GamePresenter(song)
    const view = new View(rootEl)

    presenter.inject(view)
    view.inject(presenter)

    await view.ready()
    view.render()
  }
})

const song: Song = {
  id: '1',
  title: 'サンプル',
  譜面: {
    1: {
      id: '1',
      音符: 音符.Pong,
      time: 15,
    },
    2: {
      id: '2',
      音符: 音符.Poing,
      time: 25,
    },
    3: {
      id: '3',
      音符: 音符.Su,
      time: 35,
    },
  },
}
