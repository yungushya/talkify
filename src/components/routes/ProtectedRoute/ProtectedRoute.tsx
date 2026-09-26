import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/providers';

import { ROUTES } from '@/constants/routes';

export const ProtectedRoute = () => {
  const { credentials } = useAuth();

  if (!credentials) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  return <Outlet />;
};
