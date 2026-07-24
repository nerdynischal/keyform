import { SoundIcon } from './SoundIcon.jsx'

export function SiteHeader({ muted, onToggleSound, onReset }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Keyform home">
        <span className="brand__mark" aria-hidden="true">
          <span>K</span>
        </span>
        <span>KEYFORM</span>
      </a>

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
