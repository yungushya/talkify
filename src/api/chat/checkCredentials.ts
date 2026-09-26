import { instance } from '@/api/instance';
import { instancePath } from '@/api/instancePath';

import type { ICredentials } from '@/types/credentials.types';

export async function checkCredentials(credentials: ICredentials) {
  const api = instancePath(credentials, 'getSettings');

  try {
    await instance.get(api);

    return true;
  } catch {
    return false;
  }
}
