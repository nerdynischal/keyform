import { useEffect, useState } from 'react'

const STORAGE_KEY = 'keyform-platform'
const DEFAULT_PLATFORM = 'windows'
const SUPPORTED_PLATFORMS = new Set(['mac', 'windows'])

function getSavedPlatform() {
  try {
    const savedPlatform = window.localStorage.getItem(STORAGE_KEY)
    return SUPPORTED_PLATFORMS.has(savedPlatform) ? savedPlatform : DEFAULT_PLATFORM
  } catch {
    return DEFAULT_PLATFORM
  }
}

export function usePlatformPreference() {
  const [platform, setPlatform] = useState(getSavedPlatform)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, platform)
    } catch {
      // The switch still works when storage is unavailable.
    }
  }, [platform])

  return [platform, setPlatform]
}
