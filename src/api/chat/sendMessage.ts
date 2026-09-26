import { instance } from '@/api/instance';
import { instancePath } from '@/api/instancePath';

import type { ICredentials } from '@/types/credentials.types';
import type { ISendMessageResponse } from '@/types/responses.types';

export async function sendMessage(
  credentials: ICredentials,
  chatId: string,
  message: string
) {
  const api = instancePath(credentials, 'sendMessage');

  const response = await instance.post<ISendMessageResponse>(api, {
    chatId,
    message
  });

  return response.data;
}
