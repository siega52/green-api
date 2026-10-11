import { greenApiRequest, type GreenApiCredentials } from '@/shared/api'

export type SendMessageResponse = {
  idMessage?: string
}

export async function sendMessage(
  credentials: GreenApiCredentials,
  payload: { chatId: string; message: string },
) {
  return greenApiRequest<SendMessageResponse>({
    ...credentials,
    method: 'sendMessage',
    httpMethod: 'POST',
    body: payload,
  })
}
