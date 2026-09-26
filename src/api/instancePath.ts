import { resolveApiUrl } from '@/api/resolveApiUrl';

import type { ICredentials } from '@/types/credentials.types';

export const instancePath = (credentials: ICredentials, method: string) => {
  const apiUrl = resolveApiUrl(credentials);
  const id = credentials.idInstance;
  const token = credentials.apiTokenInstance;

  return `${apiUrl}/waInstance${id}/${method}/${token}`;
};
