import { useRef } from 'react'
import Hero from './components/hero'
import buttonClickSound from './assets/song/btnclick.mp3'

function App() {
  const clickAudioRef = useRef(null)

  const playButtonClick = (event) => {
    const button = event.target.closest('button')
    if (!button || button.disabled || button.getAttribute('aria-disabled') === 'true') {
      return
    }

    if (!clickAudioRef.current) {
      clickAudioRef.current = new Audio(buttonClickSound)
      clickAudioRef.current.volume = 0.55
    }

    clickAudioRef.current.currentTime = 0
    clickAudioRef.current.play().catch(() => {})
  }

  return (
    <div className="app" onClickCapture={playButtonClick}>
      <Hero />
    </div>
  )
}

export default App
