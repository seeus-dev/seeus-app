import React from 'react';

import { AuthProvider } from './contexts/AuthContext';
import AppNavigationRoot from './navigation/AppNavigationRoot';
import { AppContextProvider } from './contexts/AppContext';

export default function App() {
  return (
    <AppContextProvider>
      <AuthProvider>
        <AppNavigationRoot />
      </AuthProvider>
    </AppContextProvider>
  );
}
