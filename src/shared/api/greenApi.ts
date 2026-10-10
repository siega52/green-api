export type GreenApiCredentials = {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
}

export type GreenApiRequestOptions = GreenApiCredentials & {
  method: string
  httpMethod?: 'GET' | 'POST' | 'DELETE'
  body?: unknown
  query?: Record<string, string>
}

export async function greenApiRequest<T = unknown>({
  apiUrl,
  idInstance,
  apiTokenInstance,
  method,
  httpMethod = 'GET',
  body,
  query,
}: GreenApiRequestOptions): Promise<T | null> {
  const base = String(apiUrl ?? '').replace(/\/$/, '')
  const path = `${base}/waInstance${idInstance}/${method}/${apiTokenInstance}`
  const url = query ? `${path}?${new URLSearchParams(query)}` : path

  const response = await fetch(url, {
    method: httpMethod,
    headers:
      body != null ? { 'Content-Type': 'application/json' } : undefined,
    body: body != null ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(
      text || `GREEN-API ${method} failed with ${response.status}`,
    )
  }

  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text) as T
  } catch {
    return text as T
  }
}
