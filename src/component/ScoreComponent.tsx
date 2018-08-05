import React from "react"
import styled from "styled-components"
import { Animate } from "react-move"
import { Score, 符 } from "../App"
import { easeLinear } from 'd3-ease'

interface Props {
  score: Score
  elapsedTime: number
}

interface State {
  browserWidth: number
}

export class ScoreComponent extends React.Component<Props, State> {
  state = {
    browserWidth: window.innerWidth,
  }

  render() {
    const { score } = this.props
    return (
      <>
        <Container>
          <HitCircle/>
          <>
            {score.符s.filter((fu) => {
              return this.props.elapsedTime > fu.time * 1000
            }).map((fu, key) => (
              <符Component
                key={key}
                browserWidth={this.state.browserWidth}
                          speed={this.props.score.speed}
                          fu={fu.fu}
              />
            ))}
          </>
        </Container>
      </>
    )
  }
}

const 符Component: React.SFC<{ fu: 符, speed: number, browserWidth: number }> = (props) => {
  return (
    <Animate
      start={() => ({
        x: props.browserWidth,
      })}
      enter={() => ({
        x: [0],
        timing: { duration: 10000, ease: easeLinear },
      })}
    >
      {(state) => (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: `${state.x}px`,
            width: '44px',
            height: '44px',
            color: 'white',
            backgroundColor: 'blue',
            border: '1px solid #ccc',
            borderRadius: '44px',
            margin: 0
          }}
        >{props.fu}</p>
      )}
    </Animate>
  )
}

const Container = styled.div`
  position: relative;
  
  &:before {
    content: "";
    display: block;
    border-top: solid 1px black;
    width: 100%;
    height: 1px;
    position: absolute;
    top: 50%;
    z-index: 1;
  }
`

const HitCircle = styled.div`
  display: block;
  height: 44px;
  width: 44px;
  
  content: "";
  border: 1px solid #333;
  border-radius: 22px;
`
