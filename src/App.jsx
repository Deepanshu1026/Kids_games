import { useRef } from 'react'
import Hero from './components/hero'
import buttonClickSound from './assets/song/btnclick.mp3'

function App() {
  const clickAudioRef = useRef(null)

  const findClickableElement = (target, root) => {
    let element = target instanceof Element ? target : null

    while (element && element !== root.parentElement) {
      const tagName = element.tagName?.toLowerCase()
      const role = element.getAttribute?.('role')
      const tabIndex = element.getAttribute?.('tabindex')
      const isNativeControl = ['button', 'a', 'input', 'select', 'textarea', 'summary'].includes(tagName)
      const isInteractiveRole = ['button', 'link', 'tab', 'switch', 'checkbox', 'radio'].includes(role)
      const isKeyboardTarget = tabIndex !== null && tabIndex !== '-1'
      const isPointerTarget = window.getComputedStyle(element).cursor === 'pointer'

      if (isNativeControl || isInteractiveRole || isKeyboardTarget || isPointerTarget) {
        return element
      }

      if (element === root) {
        break
      }

      element = element.parentElement
    }

    return null
  }

  const playButtonClick = (event) => {
    const clickableElement = findClickableElement(event.target, event.currentTarget)
    if (
      !clickableElement ||
      clickableElement.disabled ||
      clickableElement.getAttribute('aria-disabled') === 'true'
    ) {
      return
    }

    if (!clickAudioRef.current) {
      clickAudioRef.current = new Audio(buttonClickSound)
      clickAudioRef.current.volume = 0.55
    }

    clickAudioRef.current.currentTime = 0
    clickAudioRef.current.play().catch(() => { })
  }

  return (
    <div className="app" onClickCapture={playButtonClick}>
      <Hero />
    </div>
  )
}

export default App
