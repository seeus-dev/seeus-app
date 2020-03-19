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
import {useAuthState, UserInfo} from "../contexts/AuthContext";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LoggedOutNavigator() {
    return (
        <Stack.Navigator headerMode="none" screenOptions={{
            animationTypeForReplace: 'pop'
        }}>
            <Stack.Screen name="Entry" component={EntryScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="OauthWebView" component={OauthWebViewScreen}/>
        </Stack.Navigator>
    );
}

function LoggedInMainNav() {
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

function LoggedInNewUserNav() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="EnterEid" component={EnterEidScreen}/>
        </Stack.Navigator>
    );
}

function LoggedInAppOnboarding() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="LocationPermission" component={LocationPermissionScreen}/>
        </Stack.Navigator>
    );
}

function LoggedInNavigator({ user }: { user: UserInfo }) {
    const {hasRequestedLocationPerm} = useAppState();
    const showOnboarding = !hasRequestedLocationPerm;

    if (!user.eid) {
        return <LoggedInNewUserNav/>;
    }
    if (showOnboarding) {
        return <LoggedInAppOnboarding />;
    }
    return <LoggedInMainNav/>;
}

export default function AppNavigationRoot() {
    const authState = useAuthState();
    const appDispatch = useAppDispatch();
    useEffectPopulateAppState(appDispatch);

    console.log('Root component render. Auth state = ', authState);
    return (
        <NavigationContainer>
            {authState.isLoggedIn ? <LoggedInNavigator user={authState.user}/> : <LoggedOutNavigator/>}
        </NavigationContainer>
    );
}