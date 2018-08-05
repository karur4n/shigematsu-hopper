import React from "react"
import { PlayInstruction } from "./component/PlayInstruction"
import { hot } from "react-hot-loader"
import { ScoreComponent } from "./component/ScoreComponent"
import { PlaySoundComponent } from "./component/PlaySoundComponent/PlaySoundComponent"

export enum 符 {
  Pong = 'ポン',
  Poing = 'ポイン',
  Su = 'ス'
}

export interface Score {
  speed: number,
  符s: Array<{fu: 符, time: number}>
}

const score = {
  speed: 100,
  符s: [
    {
      fu: 符.Pong,
      time: 1
    },
    {
      fu: 符.Pong,
      time: 1.3
    },
    {
      fu: 符.Su,
      time: 1.6
    },
    {
      fu: 符.Poing,
      time: 10
    },
    {
      fu: 符.Pong,
      time: 15
    }
  ],
}

interface State {
  elapsedTime: number
}

class AppComponent extends React.Component<{}, State> {
  mountedTime?: number = undefined

  state = {
    elapsedTime: 0,
  }

  componentDidMount() {
    this.mountedTime= new Date().getTime()

    window.requestAnimationFrame(this.countTimer)
  }

  countTimer = () => {
    const { mountedTime } = this
    const current = new Date()

    if (mountedTime== null) {
      return undefined
    }

    this.setState({
      elapsedTime: current.getTime() - mountedTime,
    })

    window.requestAnimationFrame(this.countTimer)
  }

  render() {
    return (
      <>
        <PlaySoundComponent/>
        <ScoreComponent score={score} elapsedTime={this.state.elapsedTime}/>
        <PlayInstruction/>
      </>
    )
  }
}

export const App = hot(module)(AppComponent)
