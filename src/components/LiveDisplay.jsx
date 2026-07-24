export function LiveDisplay({ typed }) {
  return (
    <div className="intro">
      <h1
        id="page-title"
        className="live-title"
        aria-live="polite"
        aria-label={typed ? `Typed text: ${typed}` : 'Typed text area. Start typing.'}
      >
        <span className="live-title__line" aria-hidden="true">
          <span>{typed}</span>
          <span className="caret" />
        </span>
      </h1>
      <p className="lede">Use your keyboard, or tap the keys below.</p>
    </div>
  )
}
