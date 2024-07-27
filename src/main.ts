const audioContext = new AudioContext()
const mainGainNode = new GainNode(audioContext)

const wavePicker = document.querySelector("select[name='waveform']")
const volumeControl = document.querySelector("input[name='volume']")

function changeVolume(event) {
  mainGainNode.gain.value = volumeControl.value
}

volumeControl.addEventListener('change', changeVolume, false)

mainGainNode.connect(audioContext.destination)
mainGainNode.gain.value = volumeControl.value

const oscillators = {}

document.addEventListener('keydown', function (event) {
  const keyMap = {
    z: 261.63, // C4
    s: 277.18, // C#4
    x: 293.66, // D4
    d: 311.13, // D#4
    c: 329.63, // E4
    v: 349.23, // F4
    g: 369.99, // F#4
    b: 392.0, // G4
    h: 415.3, // G#4
    n: 440.0, // A4
    j: 466.16, // A#4
    m: 493.88, // B4
    ',': 523.26,
  }

  const frequency = keyMap[event.key]
  if (frequency && !oscillators[event.key]) {
    const oscillator = audioContext.createOscillator()
    oscillator.type = 'sawtooth' // 'square', 'sawtooth', 'triangle'
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.connect(audioContext.destination)
    oscillator.start()
    oscillators[event.key] = oscillator
  }
})

document.addEventListener('keyup', function (event) {
  if (oscillators[event.key]) {
    oscillators[event.key].stop()
    delete oscillators[event.key]
  }
})
