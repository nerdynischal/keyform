import { useStoredPreference } from './useStoredPreference.js'

const STORAGE_KEY = 'keyform-appearance'
const DEFAULT_APPEARANCE = 'original'
const SUPPORTED_APPEARANCES = new Set(['original', 'pebble'])

export function useKeyboardAppearance() {
  return useStoredPreference(
    STORAGE_KEY,
    DEFAULT_APPEARANCE,
    SUPPORTED_APPEARANCES,
  )
}
