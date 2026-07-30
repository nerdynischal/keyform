import { InteractionFooter } from './components/InteractionFooter.jsx'
import { LiveDisplay } from './components/LiveDisplay.jsx'
import { SiteHeader } from './components/SiteHeader.jsx'
import { InteractiveKeyboard } from './components/keyboard/InteractiveKeyboard.jsx'
import { useKeyboardAppearance } from './hooks/useKeyboardAppearance.js'
import { useKeyboardInput } from './hooks/useKeyboardInput.js'
import { usePlatformPreference } from './hooks/usePlatformPreference.js'
import './App.css'

function App() {
  const [platform, setPlatform] = usePlatformPreference()
  const [appearance, setAppearance] = useKeyboardAppearance()
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
        platform={platform}
        appearance={appearance}
        muted={muted}
        onPlatformChange={setPlatform}
        onAppearanceChange={setAppearance}
        onToggleSound={toggleMuted}
        onReset={reset}
      />

      <section className="hero" id="top" aria-labelledby="page-title">
        <LiveDisplay typed={typed} />
        <InteractiveKeyboard
          platform={platform}
          appearance={appearance}
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
