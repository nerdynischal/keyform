export function ArrowIcon({ direction }) {
  return (
    <svg
      className={`keycap__arrow keycap__arrow--${direction}`}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M4.5 9.5 8 6l3.5 3.5" />
    </svg>
  )
}
