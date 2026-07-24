import { SoundIcon } from './SoundIcon.jsx'

const BRAND_MARK_URL = `${import.meta.env.BASE_URL}keyform-key.svg`

const PLATFORMS = [
  { value: 'mac', label: 'Mac' },
  { value: 'windows', label: 'Windows' },
]

export function SiteHeader({
  platform,
  muted,
  onPlatformChange,
  onToggleSound,
  onReset,
}) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Keyform home">
        <img className="brand__mark" src={BRAND_MARK_URL} alt="" aria-hidden="true" />
        <span>KEYFORM</span>
      </a>

      <div className="platform-toggle" role="group" aria-label="Keyboard platform">
        {PLATFORMS.map((option) => (
          <button
            className={platform === option.value ? 'is-active' : ''}
            type="button"
            key={option.value}
            onClick={() => onPlatformChange(option.value)}
            aria-pressed={platform === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="control-actions">
        <button
          className="control-button"
          type="button"
          onClick={onToggleSound}
          aria-pressed={muted}
        >
          <SoundIcon muted={muted} />
          {muted ? 'Sound off' : 'Sound on'}
        </button>
        <button className="control-button" type="button" onClick={onReset}>
          Reset
        </button>
      </div>
    </header>
  )
}
