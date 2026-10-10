import type { ChangeEvent, InputHTMLAttributes } from 'react'
import './Input.css'

type InputProps = {
  label?: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  className?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'placeholder' | 'name' | 'autoComplete' | 'disabled'
>

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  name,
  autoComplete,
  disabled,
  className = '',
}: InputProps) {
  return (
    <label className={`ui-input ${className}`.trim()}>
      {label ? <span className="ui-input__label">{label}</span> : null}
      <input
        className="ui-input__control"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </label>
  )
}
