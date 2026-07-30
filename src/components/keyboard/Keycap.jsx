import { ArrowIcon } from './ArrowIcon.jsx'

function getItemClassName(baseClass, item) {
  return `${baseClass}${item.cluster ? ` ${baseClass}--${item.cluster}` : ''}`
}

function getKeycapClassName(item, pressed) {
  return [
    'keycap',
    pressed && 'is-pressed',
    item.small && 'keycap--small',
    item.indicator && 'keycap--indicator-only',
    item.opticalSymbol && 'keycap--optical-symbol',
    item.align && `keycap--${item.align}`,
    item.cluster && `keycap--${item.cluster}`,
  ].filter(Boolean).join(' ')
}

export function Keycap({ item, pressed, capsLock, onPress, onRelease }) {
  if (item.spacer) {
    return (
      <span
        className={getItemClassName('key-spacer', item)}
        style={{ '--space': item.spacer }}
        aria-hidden="true"
      />
    )
  }

  if (item.placeholder) {
    return <span className={getItemClassName('key-placeholder', item)} aria-hidden="true" />
  }

  const release = () => onRelease(item.code)

  return (
    <button
      className={getKeycapClassName(item, pressed)}
      style={{ '--key-width': item.width || 1 }}
      type="button"
      data-code={item.code}
      aria-label={item.aria || item.label || item.code}
      aria-pressed={item.code === 'CapsLock' ? capsLock : pressed}
      tabIndex={-1}
      onPointerDown={(event) => {
        event.preventDefault()
        event.currentTarget.setPointerCapture?.(event.pointerId)
        onPress(item.code)
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      onContextMenu={(event) => event.preventDefault()}
    >
      <span className="keycap__surface">
        {item.indicator ? (
          <span className="keycap__indicator-group">
            <span
              className={`keycap__indicator${capsLock ? ' is-on' : ''}`}
              aria-hidden="true"
            />
            <span className="keycap__label">{item.label}</span>
          </span>
        ) : item.arrow ? (
          <ArrowIcon direction={item.arrow} />
        ) : item.sub ? (
          <span className="keycap__legends">
            <span>{item.sub}</span>
            <span>{item.label}</span>
          </span>
        ) : (
          <span className="keycap__label">{item.label}</span>
        )}

        {item.homing && <span className="homing-bar" />}
      </span>
    </button>
  )
}
