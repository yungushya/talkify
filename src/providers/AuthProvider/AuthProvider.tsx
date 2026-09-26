import { type ReactNode, useState } from 'react';

import { AuthContext } from '@/providers/AuthProvider/AuthContext';

import type { ICredentials } from '@/types/credentials.types';

import { STORAGE_KEY } from '@/constants/tokens';

function readStoredCredentials(): ICredentials | null {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as ICredentials;
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [credentials, setCredentials] = useState<ICredentials | null>(
    readStoredCredentials
  );

  const login = (next: ICredentials) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

    setCredentials(next);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);

    setCredentials(null);
  };

  const value = {
    credentials,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
