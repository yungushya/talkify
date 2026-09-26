import { createContext } from 'react';

import type { ICredentials } from '@/types/credentials.types';

export interface AuthContextValue {
  credentials: ICredentials | null;
  login: (credentials: ICredentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
