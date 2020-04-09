import React from 'react';

import { AuthProvider } from './contexts/AuthContext';
import AppNavigationRoot from './navigation/AppNavigationRoot';
import { AppContextProvider } from './contexts/AppContext';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <AppContextProvider>
        <AuthProvider>
          <AppNavigationRoot />
        </AuthProvider>
      </AppContextProvider>
    </>
  );
}
