import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import EntryScreen from "../screens/EntryScreen";
import LoginScreen from "../screens/login/LoginScreen";
import NewRequestScreen from "../screens/NewRequestScreen";
import RequestsScreen from "../screens/RequestsScreen";
import HoursScreen from "../screens/HoursScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import OauthWebViewScreen from "../screens/login/OauthWebViewScreen";
import EnterEidScreen from "../screens/login/EnterEidScreen";
import AppDrawerContent from "./AppDrawerContent";
import LocationPermissionScreen from "../screens/login/LocationPermissionScreen";
import {useAppDispatch, useAppState, useEffectPopulateAppState} from "../contexts/AppContext";
import {useAuthState} from "../contexts/AuthContext";

const RootStack = createStackNavigator();

export default function AppNavigationRoot() {
    const authState = useAuthState();
    const appState = useAppState();
    const appDispatch = useAppDispatch();
    useEffectPopulateAppState(appDispatch);

    console.log('Root component render. Auth state = ', authState);
    return (
        <NavigationContainer>
            <RootStack.Navigator headerMode="none" screenOptions={{gestureEnabled: false}}>
                {authState.isLoggedIn ? getLoggedInScreens(authState, appState) : getLoggedOutScreens()}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

function getLoggedOutScreens() {
    return (
        <>
            <RootStack.Screen name="Entry" component={EntryScreen}/>
            <RootStack.Screen name="Login" component={LoginScreen}/>
            <RootStack.Screen name="OauthWebView" component={OauthWebViewScreen}/>
        </>
    );
}

function getLoggedInScreens(authState, appState) {
    if (authState.user.eid) {
        return <RootStack.Screen name="EnterEid" component={EnterEidScreen}/>;
    } else if (!appState.hasRequestedLocationPermission) {
        return <RootStack.Screen name="LocationPermission" component={LocationPermissionScreen}/>;
    }
    return <RootStack.Screen name="LoggedInDrawer" component={LoggedInDrawerNav}/>;
}

const Drawer = createDrawerNavigator();

function LoggedInDrawerNav() {
    return (
        <Drawer.Navigator drawerContent={props => <AppDrawerContent {...props} />}>
            <Drawer.Screen
                name="Main"
                component={NewRequestScreen}
                options={{title: "Request SEEUS"}}
            />
            <Drawer.Screen name="My Requests" component={RequestsScreen}/>
            <Drawer.Screen name="Hours" component={HoursScreen}/>
            <Drawer.Screen name="Help" component={HelpScreen}/>
            <Drawer.Screen name="Settings" component={SettingsScreen}/>
        </Drawer.Navigator>
    );
}
