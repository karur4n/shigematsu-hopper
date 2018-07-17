"use strict"

window.addEventListener('DOMContentLoaded', () => {
  const bufferLoader = new BufferLoader(
    context,
    [
      'assets/audios/pong.wav',
      'assets/audios/poing.wav',
      'assets/audios/su.wav',
    ],
    (bufferList) => {
      document.getElementById('pong').addEventListener('click', () => {
        playSound(bufferList[0])
      })
      document.getElementById('poing').addEventListener('click', () => {
        playSound(bufferList[1])
      })
      document.getElementById('su').addEventListener('click', () => {
        playSound(bufferList[2])
      })

      document.addEventListener('keypress', (e) => {
        switch (e.keyCode) {
          case 97: // a
            playSound(bufferList[0])
            break;
          case 115: // s
            playSound(bufferList[1])
            break;
          case 100: // d
            playSound(bufferList[2])
            break;
        }
      })
    });

  bufferLoader.load();
})

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

let playingSource = undefined

function playSound(buffer) {
  if (playingSource != null) {
    playingSource.stop()
    playingSource = undefined
  }

  const source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
  playingSource = source
}