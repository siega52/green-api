export function normalizePhone(value: string | number | null | undefined): string {
  return String(value ?? '').replace(/\D/g, '')
}

export function phoneToChatId(phone: string): string {
  const digits = normalizePhone(phone)
  if (!digits) return ''
  return `${digits}@c.us`
}
