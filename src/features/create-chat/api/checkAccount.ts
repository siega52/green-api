import { greenApiRequest, type GreenApiCredentials } from '@/shared/api'

export type CheckAccountResponse = {
  exist?: boolean
  chatId?: string
  name?: string
  username?: string
  phoneNumber?: number
  status?: boolean
  reason?: string
}

export async function checkAccount(
  credentials: GreenApiCredentials,
  phoneNumber: string,
) {
  return greenApiRequest<CheckAccountResponse>({
    ...credentials,
    method: 'checkAccount',
    httpMethod: 'POST',
    body: { phoneNumber: Number(phoneNumber) },
  })
}
