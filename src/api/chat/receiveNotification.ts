import axios from 'axios';

import { instance } from '@/api/instance';
import { instancePath } from '@/api/instancePath';

import type { ICredentials } from '@/types/credentials.types';
import type { IReceiveNotificationResponse } from '@/types/notification.types';

export async function receiveNotification(credentials: ICredentials) {
  try {
    const api = instancePath(credentials, 'receiveNotification');

    const response = await instance.get<IReceiveNotificationResponse | ''>(
      api,
      {
        params: {
          receiveTimeout: 5
        }
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 408) {
      return null;
    }

    throw error;
  }
}
