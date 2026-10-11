import { STORAGE_KEYS } from '@/shared/config'
import type { Credentials } from './types'

export function loadCredentials(): Credentials | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.credentials)
    if (!raw) return null
    return JSON.parse(raw) as Credentials
  } catch {
    return null
  }
}

export function saveCredentials(credentials: Credentials): void {
  localStorage.setItem(STORAGE_KEYS.credentials, JSON.stringify(credentials))
}

export function clearCredentials(): void {
  localStorage.removeItem(STORAGE_KEYS.credentials)
}
