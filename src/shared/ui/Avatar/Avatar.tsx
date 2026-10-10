import './Avatar.css'

type AvatarProps = {
  name?: string
  size?: number
}

export function Avatar({ name = '', size = 40 }: AvatarProps) {
  const letter = String(name).trim().charAt(0).toUpperCase() || '?'

  return (
    <span
      className="ui-avatar"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden
    >
      {letter}
    </span>
  )
}
