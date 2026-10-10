import { RECEIVE_TIMEOUT_SEC } from '@/shared/config'
import { greenApiRequest } from '@/shared/api'

export async function receiveNotification(
  credentials,
  receiveTimeout = RECEIVE_TIMEOUT_SEC,
) {
  return greenApiRequest({
    ...credentials,
    method: 'receiveNotification',
    httpMethod: 'GET',
    query: { receiveTimeout: String(receiveTimeout) },
  })
}
