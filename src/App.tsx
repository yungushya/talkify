import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import { AppProvider } from '@/providers';

import { ROUTES } from '@/constants/routes';

import { ProtectedRoute } from '@/components';

import { ChatPage, LoginPage } from '@/pages';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Navigate
                to={ROUTES.CHAT}
                replace
              />
            }
          />

          <Route
            path={ROUTES.LOGIN}
            element={<LoginPage />}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path={ROUTES.CHAT}
              element={<ChatPage />}
            />
          </Route>

          <Route
            path='*'
            element={
              <Navigate
                to={ROUTES.CHAT}
                replace
              />
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
