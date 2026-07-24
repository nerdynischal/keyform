import { InteractionFooter } from './components/InteractionFooter.jsx'
import { LiveDisplay } from './components/LiveDisplay.jsx'
import { SiteHeader } from './components/SiteHeader.jsx'
import { InteractiveKeyboard } from './components/keyboard/InteractiveKeyboard.jsx'
import { useKeyboardInput } from './hooks/useKeyboardInput.js'
import './App.css'

function App() {
  const {
    capsLock,
    lastKey,
    muted,
    pressCount,
    pressedKeys,
    pressKey,
    releaseKey,
    reset,
    toggleMuted,
    typed,
  } = useKeyboardInput()

  return (
    <main className="page-shell">
      <SiteHeader
        muted={muted}
        onToggleSound={toggleMuted}
        onReset={reset}
      />

      <section className="hero" id="top" aria-labelledby="page-title">
        <LiveDisplay typed={typed} />
        <InteractiveKeyboard
          pressedKeys={pressedKeys}
          capsLock={capsLock}
          onPress={pressKey}
          onRelease={releaseKey}
        />
        <InteractionFooter lastKey={lastKey} pressCount={pressCount} />
      </section>
    </main>
  )
}

export default App
