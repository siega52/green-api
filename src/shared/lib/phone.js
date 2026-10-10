export function normalizePhone(value) {
  return String(value ?? '').replace(/\D/g, '')
}

export function phoneToChatId(phone) {
  const digits = normalizePhone(phone)
  if (!digits) return ''
  return `${digits}@c.us`
}
