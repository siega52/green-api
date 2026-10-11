import { RECEIVE_TIMEOUT_SEC } from '@/shared/config'
import { greenApiRequest, type GreenApiCredentials } from '@/shared/api'
import type { NotificationBody } from '../lib/parseNotification'

export type ReceiveNotificationResponse = {
  receiptId: number
  body: NotificationBody
}

export async function receiveNotification(
  credentials: GreenApiCredentials,
  receiveTimeout = RECEIVE_TIMEOUT_SEC,
) {
  return greenApiRequest<ReceiveNotificationResponse>({
    ...credentials,
    method: 'receiveNotification',
    httpMethod: 'GET',
    query: { receiveTimeout: String(receiveTimeout) },
  })
}
