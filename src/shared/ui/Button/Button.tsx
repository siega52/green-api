import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled' | 'onClick'>

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled,
  onClick,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`ui-button ui-button--${variant} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
