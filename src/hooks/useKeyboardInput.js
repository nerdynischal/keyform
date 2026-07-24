import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CHARACTERS_BY_CODE,
  PUNCTUATION_BY_CODE,
} from '../components/keyboard/keyboard-layout.js'

const MAX_TYPED_CHARACTERS = 32
const PREVENT_DEFAULT_CODES = new Set(['Space', 'ArrowUp', 'ArrowDown'])

function formatLastKey(code) {
  return code.replace(/^(Key|Digit)/, '').replace(/Left|Right/, '')
}

function appendCharacter(current, code, character) {
  if (code === 'Backspace') return current.slice(0, -1)
  if (code === 'Enter') return `${current} ↵`.slice(-MAX_TYPED_CHARACTERS)

  const nextCharacter = character ?? CHARACTERS_BY_CODE[code] ?? PUNCTUATION_BY_CODE[code]
  return nextCharacter
    ? `${current}${nextCharacter}`.slice(-MAX_TYPED_CHARACTERS)
    : current
}

export function useKeyboardInput() {
  const [pressedKeys, setPressedKeys] = useState(() => new Set())
  const [lastKey, setLastKey] = useState('—')
  const [pressCount, setPressCount] = useState(0)
  const [typed, setTyped] = useState('')
  const [muted, setMuted] = useState(false)
  const [capsLock, setCapsLock] = useState(false)

  const audioContextRef = useRef(null)
  const pressedKeysRef = useRef(new Set())

  const playClick = useCallback((code) => {
    if (muted) return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return

    const context = audioContextRef.current || new AudioContext()
    audioContextRef.current = context

    if (context.state === 'suspended') context.resume()

    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const now = context.currentTime

    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(
      135 + (code.charCodeAt(code.length - 1) % 8) * 7,
      now,
    )
    oscillator.frequency.exponentialRampToValueAtTime(80, now + 0.035)
    gain.gain.setValueAtTime(0.028, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045)

    oscillator.connect(gain).connect(context.destination)
    oscillator.start(now)
    oscillator.stop(now + 0.05)
  }, [muted])

  const recordPress = useCallback((code, character) => {
    setLastKey(formatLastKey(code))
    setPressCount((count) => count + 1)
    setTyped((current) => appendCharacter(current, code, character))
    playClick(code)
  }, [playClick])

  const pressKey = useCallback((code, character) => {
    if (pressedKeysRef.current.has(code)) return

    pressedKeysRef.current.add(code)
    setPressedKeys(new Set(pressedKeysRef.current))

    if (code === 'CapsLock') {
      setCapsLock((current) => !current)
    }

    recordPress(code, character)
  }, [recordPress])

  const releaseKey = useCallback((code) => {
    if (!pressedKeysRef.current.has(code)) return

    pressedKeysRef.current.delete(code)
    setPressedKeys(new Set(pressedKeysRef.current))
  }, [])

  const reset = useCallback(() => {
    pressedKeysRef.current.clear()
    setTyped('')
    setPressCount(0)
    setLastKey('—')
    setPressedKeys(new Set())
  }, [])

  const toggleMuted = useCallback(() => {
    setMuted((value) => !value)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat || (event.metaKey && event.code === 'KeyR')) return

      const isButtonActivation = (
        event.target instanceof HTMLButtonElement
        && ['Space', 'Enter'].includes(event.code)
      )
      if (isButtonActivation) return

      if (PREVENT_DEFAULT_CODES.has(event.code)) event.preventDefault()

      const isShortcut = event.metaKey || event.ctrlKey || event.altKey
      const character = isShortcut || event.key.length !== 1 ? undefined : event.key
      pressKey(event.code, isShortcut ? '' : character)
    }

    const handleKeyUp = (event) => {
      if (event.code === 'CapsLock') {
        setCapsLock(event.getModifierState('CapsLock'))
      }
      releaseKey(event.code)
    }

    const handleBlur = () => {
      pressedKeysRef.current.clear()
      setPressedKeys(new Set())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [pressKey, releaseKey])

  return {
    capsLock,
    lastKey,
    muted,
    pressCount,
    pressedKeys,
    releaseKey,
    pressKey,
    reset,
    toggleMuted,
    typed,
  }
}
