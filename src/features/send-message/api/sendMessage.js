import { greenApiRequest } from '@/shared/api'

export async function sendMessage(credentials, { chatId, message }) {
  return greenApiRequest({
    ...credentials,
    method: 'sendMessage',
    httpMethod: 'POST',
    body: { chatId, message },
  })
}
