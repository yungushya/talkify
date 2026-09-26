import { instance } from '@/api/instance';
import { instancePath } from '@/api/instancePath';

import type { ICredentials } from '@/types/credentials.types';

export async function deleteNotification(
  credentials: ICredentials,
  receiptId: number
) {
  const api = instancePath(credentials, 'deleteNotification');

  await instance.delete(`${api}/${receiptId}`);

  return { ok: true };
}
