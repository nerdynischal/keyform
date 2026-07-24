import { ARROW_KEYS, getKeyForPlatform, KEY_ROWS } from './keyboard-layout.js'
import { Keycap } from './Keycap.jsx'
import './Keyboard.css'

function KeyboardKey({ item, platform, pressedKeys, capsLock, onPress, onRelease }) {
  const displayedItem = getKeyForPlatform(item, platform)

  return (
    <Keycap
      item={displayedItem}
      pressed={item.code ? pressedKeys.has(item.code) : false}
      capsLock={capsLock}
      onPress={onPress}
      onRelease={onRelease}
    />
  )
}

export function InteractiveKeyboard({
  platform,
  pressedKeys,
  capsLock,
  onPress,
  onRelease,
}) {
  return (
    <div className="keyboard-stage">
      <div className="keyboard-shadow" />

      <section className="keyboard" aria-label="Interactive ANSI QWERTY keyboard">
        <div className="keyboard__topline">
          <span>KEYFORM / 87</span>
          <span className="keyboard__lights" aria-hidden="true">
            <i className={capsLock ? 'is-on' : ''} />
            <i />
            <i />
          </span>
        </div>

        <div className="keyboard__well">
          {KEY_ROWS.map((row, rowIndex) => (
            <div className={`key-row key-row--${rowIndex}`} key={rowIndex}>
              {row.map((item, itemIndex) => (
                <KeyboardKey
                  key={item.code || `space-${itemIndex}`}
                  item={item}
                  platform={platform}
                  pressedKeys={pressedKeys}
                  capsLock={capsLock}
                  onPress={onPress}
                  onRelease={onRelease}
                />
              ))}
            </div>
          ))}

          <div className="mobile-arrow-cluster" aria-label="Arrow keys">
            <span aria-hidden="true" />
            <KeyboardKey
              item={ARROW_KEYS.up}
              platform={platform}
              pressedKeys={pressedKeys}
              capsLock={capsLock}
              onPress={onPress}
              onRelease={onRelease}
            />
            <span aria-hidden="true" />
            {[ARROW_KEYS.left, ARROW_KEYS.down, ARROW_KEYS.right].map((item) => (
              <KeyboardKey
                key={item.code}
                item={item}
                platform={platform}
                pressedKeys={pressedKeys}
                capsLock={capsLock}
                onPress={onPress}
                onRelease={onRelease}
              />
            ))}
          </div>
        </div>

        <div className="keyboard__edge" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
    </div>
  )
}
