import React from 'react'
import { BufferLoader } from '../../BufferLoader'
const pongAudio = require('../../assets/sounds/pong.wav')
const poingAudio = require('../../assets/sounds/poing.wav')
const suAudio = require('../../assets/sounds/su.wav')

interface Sounds {
  pong: any,
  poing: any,
  su: any
}

export class PlaySoundComponent extends React.Component {
  sounds: Sounds | undefined = undefined
  playingSource: any = undefined
  audioContext: any = undefined

  componentDidMount() {
    this.setAudioContext()
    this.loadSound()

    this.registerKeyPressEvent()
  }

  registerKeyPressEvent() {
    document.addEventListener('keypress', (e) => {
      if (this.sounds == null) {
        return undefined
      }

      switch (e.code) {
        case 'KeyA': // a
          this.playSound(this.sounds.pong)
          break;
        case 'KeyS': // s
          this.playSound(this.sounds.poing)
          break;
        case 'KeyD': // d
          this.playSound(this.sounds.su)
          break;
      }
    })
  }

  setAudioContext() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
  }

  loadSound() {
    const bufferLoader = new BufferLoader(
      this.audioContext,
      [
        pongAudio,
        poingAudio,
        suAudio,
      ],
      (bufferList: any) => {
        this.sounds = {
          pong: bufferList[0],
          poing: bufferList[1],
          su: bufferList[2],
        }
      });

    bufferLoader.load();
  }

  playSound(buffer: any) {
    if (this.playingSource != null) {
      this.playingSource.stop()
      this.playingSource = undefined
    }

    const source = this.audioContext.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(this.audioContext.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
    this.playingSource = source
  }

  render() {
    return null
  }
}

