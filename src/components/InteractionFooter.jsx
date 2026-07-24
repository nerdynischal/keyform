const COPYRIGHT_YEAR = 2026

export function InteractionFooter({ lastKey, pressCount }) {
  return (
    <footer className="interaction-footer">
      <dl className="stats">
        <div>
          <dt>LAST INPUT</dt>
          <dd>{lastKey}</dd>
        </div>
        <div>
          <dt>KEYSTROKES</dt>
          <dd>{String(pressCount).padStart(3, '0')}</dd>
        </div>
      </dl>

      <div className="input-meta" aria-label="Input status and keyboard layout">
        <span className="status">
          <i />
          Input ready
        </span>
        <span className="header-divider" />
        <span>ANSI · QWERTY</span>
      </div>

      <p className="built-note">© {COPYRIGHT_YEAR} KEYFORM</p>
    </footer>
  )
}
