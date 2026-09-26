import { instance } from '@/api/instance';
import { instancePath } from '@/api/instancePath';

import type { ICredentials } from '@/types/credentials.types';

export async function enableIncomingWebhook(credentials: ICredentials) {
  const api = instancePath(credentials, 'setSettings');

  await instance.post(api, {
    incomingWebhook: 'yes'
  });
}
