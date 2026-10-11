import { greenApiRequest, type GreenApiCredentials } from '@/shared/api'

export async function deleteNotification(
  credentials: GreenApiCredentials,
  receiptId: number,
) {
  return greenApiRequest({
    ...credentials,
    method: `deleteNotification/${receiptId}`,
    httpMethod: 'DELETE',
  })
}
