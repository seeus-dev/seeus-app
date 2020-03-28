import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import EntryScreen from '../screens/EntryScreen';
import LoginScreen from '../screens/login/LoginScreen';
import MapScreen from '../screens/MapScreen';
import RequestsScreen from '../screens/RequestsScreen';
import HoursScreen from '../screens/HoursScreen';
import HelpScreen from '../screens/HelpScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OauthWebViewScreen from '../screens/login/OauthWebViewScreen';
import EnterEidScreen from '../screens/login/EnterEidScreen';
import AppDrawerContent from './AppDrawerContent';
import LocationPermissionScreen from '../screens/login/LocationPermissionScreen';
import {
  useAppDispatch,
  useAppState,
  usePopulateAppState,
} from '../contexts/AppContext';
import { useAuthState } from '../contexts/AuthContext';
import { Dimensions } from 'react-native';

const RootStack = createStackNavigator();

export default function AppNavigationRoot() {
  const authState = useAuthState();
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  usePopulateAppState(appDispatch);

  console.log('Root component render. Auth state = ', authState);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        headerMode="none"
        screenOptions={{ gestureEnabled: false }}
      >
        {authState.isLoggedIn
          ? getLoggedInScreens(authState, appState)
          : getLoggedOutScreens()}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function getLoggedOutScreens() {
  return (
    <>
      <RootStack.Screen name="Entry" component={EntryScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="OauthWebView" component={OauthWebViewScreen} />
    </>
  );
}

function getLoggedInScreens(authState, appState) {
  if (!authState.user.eid) {
    return <RootStack.Screen name="EnterEid" component={EnterEidScreen} />;
  } else if (!appState.hasRequestedLocationPermission) {
    return (
      <RootStack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      />
    );
  }
  return (
    <RootStack.Screen name="LoggedInDrawer" component={LoggedInDrawerNav} />
  );
}

const Drawer = createDrawerNavigator();

function LoggedInDrawerNav() {
  const screenWidth = Dimensions.get('window').width;
  const drawerWidth = screenWidth * (screenWidth < 400 ? 0.7 : 0.65);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AppDrawerContent {...props} />}
      drawerStyle={{ width: drawerWidth }}
      edgeWidth={50}
      minSwipeDistance={5}
    >
      <Drawer.Screen
        name="MainMap"
        component={MapScreen}
        options={{ title: 'Request SEEUS' }}
      />
      <Drawer.Screen name="My Requests" component={RequestsScreen} />
      <Drawer.Screen name="Hours" component={HoursScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
