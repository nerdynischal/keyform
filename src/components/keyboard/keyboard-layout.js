export const ARROW_KEYS = {
  up: { code: 'ArrowUp', label: '', arrow: 'up', cluster: 'arrows', aria: 'up arrow' },
  left: { code: 'ArrowLeft', label: '', arrow: 'left', cluster: 'arrows', aria: 'left arrow' },
  down: { code: 'ArrowDown', label: '', arrow: 'down', cluster: 'arrows', aria: 'down arrow' },
  right: { code: 'ArrowRight', label: '', arrow: 'right', cluster: 'arrows', aria: 'right arrow' },
}

const MAC_SYMBOL_CODES = new Set([
  'ControlLeft',
  'ControlRight',
  'MetaLeft',
  'MetaRight',
  'AltLeft',
  'AltRight',
])

const functionKeys = (codes) => codes.map((code) => ({
  code,
  label: code.toLowerCase(),
  small: true,
}))

const letterKeys = (letters, getOptions = () => ({})) => (
  letters.split('').map((letter) => ({
    code: `Key${letter}`,
    label: letter,
    ...getOptions(letter),
  }))
)

export const KEY_ROWS = [
  [
    { code: 'Escape', label: 'esc' },
    { spacer: 0.75 },
    ...functionKeys(['F1', 'F2', 'F3', 'F4']),
    { spacer: 0.5 },
    ...functionKeys(['F5', 'F6', 'F7', 'F8']),
    { spacer: 2 / 3 },
    ...functionKeys(['F9', 'F10', 'F11', 'F12']),
    { spacer: 0.5 },
    { code: 'PrintScreen', label: 'prtsc', small: true },
    { code: 'ScrollLock', label: 'scroll', small: true },
    { code: 'Pause', label: 'pause', small: true },
  ],
  [
    { code: 'Backquote', label: '`', sub: '~' },
    ...['1!', '2@', '3#', '4$', '5%', '6^', '7&', '8*', '9(', '0)'].map((pair, index) => ({
      code: `Digit${index === 9 ? 0 : index + 1}`,
      label: pair[0],
      sub: pair[1],
    })),
    { code: 'Minus', label: '-', sub: '_' },
    { code: 'Equal', label: '=', sub: '+' },
    { code: 'Backspace', label: 'backspace', width: 2, align: 'right' },
    { spacer: 0.5, cluster: 'nav' },
    { code: 'Insert', label: 'insert', small: true, cluster: 'nav' },
    { code: 'Home', label: 'home', small: true, cluster: 'nav' },
    { code: 'PageUp', label: 'pg up', small: true, cluster: 'nav' },
  ],
  [
    { code: 'Tab', label: 'tab', width: 1.5, align: 'left' },
    ...letterKeys('QWERTYUIOP'),
    { code: 'BracketLeft', label: '[', sub: '{' },
    { code: 'BracketRight', label: ']', sub: '}' },
    { code: 'Backslash', label: '\\', sub: '|', width: 1.5 },
    { spacer: 0.5, cluster: 'nav' },
    { code: 'Delete', label: 'delete', small: true, cluster: 'nav' },
    { code: 'End', label: 'end', small: true, cluster: 'nav' },
    { code: 'PageDown', label: 'pg dn', small: true, cluster: 'nav' },
  ],
  [
    { code: 'CapsLock', label: 'caps lock', width: 1.75, align: 'left', indicator: true },
    ...letterKeys('ASDFGHJKL', (letter) => ({ homing: letter === 'F' || letter === 'J' })),
    { code: 'Semicolon', label: ';', sub: ':' },
    { code: 'Quote', label: "'", sub: '"' },
    { code: 'Enter', label: 'enter', width: 2.25, align: 'right' },
    { spacer: 0.5, cluster: 'nav' },
    { placeholder: true, cluster: 'nav' },
    { placeholder: true, cluster: 'nav' },
    { placeholder: true, cluster: 'nav' },
  ],
  [
    { code: 'ShiftLeft', label: 'shift', width: 2.25, align: 'left' },
    ...letterKeys('ZXCVBNM'),
    { code: 'Comma', label: ',', sub: '<' },
    { code: 'Period', label: '.', sub: '>' },
    { code: 'Slash', label: '/', sub: '?' },
    { code: 'ShiftRight', label: 'shift', width: 2.75, align: 'right' },
    { spacer: 0.5, cluster: 'nav' },
    { placeholder: true, cluster: 'nav' },
    ARROW_KEYS.up,
    { placeholder: true, cluster: 'nav' },
  ],
  [
    { code: 'ControlLeft', label: 'ctrl', width: 1.25, align: 'left', platformLabels: { mac: '⌃', windows: 'ctrl' }, platformAria: { mac: 'control', windows: 'control' } },
    { code: 'MetaLeft', label: 'win', width: 1.25, platformLabels: { mac: '⌘', windows: 'win' }, platformAria: { mac: 'command', windows: 'windows key' } },
    { code: 'AltLeft', label: 'alt', width: 1.25, platformLabels: { mac: '⌥', windows: 'alt' }, platformAria: { mac: 'option', windows: 'alt' } },
    { code: 'Space', label: '', width: 6.25, aria: 'space bar' },
    { code: 'AltRight', label: 'alt', width: 1.25, platformLabels: { mac: '⌥', windows: 'alt' }, platformAria: { mac: 'option', windows: 'alt' } },
    { code: 'MetaRight', label: 'win', width: 1.25, platformLabels: { mac: '⌘', windows: 'win' }, platformAria: { mac: 'command', windows: 'windows key' } },
    { code: 'ContextMenu', label: 'menu', width: 1.25, platformLabels: { mac: 'fn', windows: 'menu' } },
    { code: 'ControlRight', label: 'ctrl', width: 1.25, align: 'right', platformLabels: { mac: '⌃', windows: 'ctrl' }, platformAria: { mac: 'control', windows: 'control' } },
    { spacer: 0.5, cluster: 'nav' },
    ARROW_KEYS.left,
    ARROW_KEYS.down,
    ARROW_KEYS.right,
  ],
]

export function getKeyForPlatform(item, platform) {
  const label = item.platformLabels?.[platform]
  if (!label) return item

  return {
    ...item,
    label,
    aria: item.platformAria?.[platform] || label,
    opticalSymbol: platform === 'mac' && MAC_SYMBOL_CODES.has(item.code),
  }
}

export const CHARACTERS_BY_CODE = Object.fromEntries(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => [`Key${letter}`, letter.toLowerCase()]),
)

for (let index = 0; index <= 9; index += 1) {
  CHARACTERS_BY_CODE[`Digit${index}`] = String(index)
}

export const PUNCTUATION_BY_CODE = {
  Backquote: '`',
  Minus: '-',
  Equal: '=',
  BracketLeft: '[',
  BracketRight: ']',
  Backslash: '\\',
  Semicolon: ';',
  Quote: "'",
  Comma: ',',
  Period: '.',
  Slash: '/',
  Space: ' ',
}
