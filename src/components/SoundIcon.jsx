export function SoundIcon({ muted }) {
  return muted ? (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.25 8h3l3.5-3v10l-3.5-3h-3V8Zm10-1 3.5 6m0-6-3.5 6" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.25 8h3l3.5-3v10l-3.5-3h-3V8Zm9.2-.65a4 4 0 0 1 0 5.3m2-7.3a6.75 6.75 0 0 1 0 9.3" />
    </svg>
  )
}
