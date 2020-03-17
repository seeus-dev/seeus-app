import React from 'react';

import {AuthProvider} from "./contexts/AuthContext";
import AppNavigationRoot from "./navigation/AppNavigationRoot";

export default function App() {
    return (
        <AuthProvider>
            <AppNavigationRoot/>
        </AuthProvider>
    );
}
