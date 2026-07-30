import { useEffect, useState } from 'react'

export function useStoredPreference(storageKey, defaultValue, supportedValues) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(storageKey)
      return supportedValues.has(savedValue) ? savedValue : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, value)
    } catch {
      // The preference still works for the current session when storage is unavailable.
    }
  }, [storageKey, value])

  return [value, setValue]
}
