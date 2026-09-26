import type { ICredentials } from '@/types/credentials.types';

const DEFAULT_API_URL = 'https://api.green-api.com';

export const resolveApiUrl = ({ idInstance, apiUrl }: ICredentials) => {
  if (apiUrl?.trim()) {
    return apiUrl.trim();
  }

  const cluster = idInstance.slice(0, 4);
  const isValidCluster = /^\d{4}$/.test(cluster);
  const url = isValidCluster
    ? `https://${cluster}.api.green-api.com`
    : DEFAULT_API_URL;

  return url;
};
