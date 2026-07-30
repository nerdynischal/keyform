import { SoundIcon } from './SoundIcon.jsx'

const BRAND_MARK_URL = `${import.meta.env.BASE_URL}keyform-key.svg`

const PLATFORMS = [
  { value: 'mac', label: 'Mac' },
  { value: 'windows', label: 'Windows' },
]

const APPEARANCES = [
  { value: 'original', label: 'Original' },
  { value: 'pebble', label: 'Pebble' },
]

function HeaderToggle({ label, options, value, onChange }) {
  return (
    <div className="header-toggle" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          className={value === option.value ? 'is-active' : ''}
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function SiteHeader({
  platform,
  appearance,
  muted,
  onPlatformChange,
  onAppearanceChange,
  onToggleSound,
  onReset,
}) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Keyform home">
        <img className="brand__mark" src={BRAND_MARK_URL} alt="" aria-hidden="true" />
        <span>KEYFORM</span>
      </a>

      <div className="header-selectors">
        <HeaderToggle
          label="Keyboard platform"
          options={PLATFORMS}
          value={platform}
          onChange={onPlatformChange}
        />
        <HeaderToggle
          label="Keyboard appearance"
          options={APPEARANCES}
          value={appearance}
          onChange={onAppearanceChange}
        />
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
