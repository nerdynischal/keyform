import { useStoredPreference } from './useStoredPreference.js'

const STORAGE_KEY = 'keyform-platform'
const DEFAULT_PLATFORM = 'windows'
const SUPPORTED_PLATFORMS = new Set(['mac', 'windows'])

export function usePlatformPreference() {
  return useStoredPreference(
    STORAGE_KEY,
    DEFAULT_PLATFORM,
    SUPPORTED_PLATFORMS,
  )
}
