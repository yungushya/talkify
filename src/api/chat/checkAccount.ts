import { instance } from '@/api/instance';
import { instancePath } from '@/api/instancePath';

import type { ICredentials } from '@/types/credentials.types';
import type { ICheckAccountResponse } from '@/types/responses.types';

export async function checkAccount(
  credentials: ICredentials,
  phoneNumber: string
) {
  const api = instancePath(credentials, 'checkAccount');
  const phone = Number(phoneNumber.replace(/\D/g, ''));

  const response = await instance.post<ICheckAccountResponse>(api, {
    phoneNumber: phone
  });

  return response.data;
}
