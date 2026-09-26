import type { ReactNode } from 'react';

import { AuthProvider } from '@/providers/AuthProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
