import './Avatar.css'

type AvatarProps = {
  name?: string
  size?: number
}

const PALETTE = [
  'linear-gradient(145deg, #6ec6ff, #3390ec)',
  'linear-gradient(145deg, #7ad3a3, #3aa76d)',
  'linear-gradient(145deg, #f0a56d, #e07a3a)',
  'linear-gradient(145deg, #c39be8, #8f6bcb)',
  'linear-gradient(145deg, #f2b4c8, #d86b8a)',
  'linear-gradient(145deg, #7fd4d2, #3a9ea0)',
]

function pickGradient(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash + seed.charCodeAt(i) * (i + 1)) % PALETTE.length
  }
  return PALETTE[hash]
}

export function Avatar({ name = '', size = 40 }: AvatarProps) {
  const letter = String(name).trim().charAt(0).toUpperCase() || '?'
  const background = pickGradient(name || '?')

  return (
    <span
      className="ui-avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background,
      }}
      aria-hidden
    >
      {letter}
    </span>
  )
}
