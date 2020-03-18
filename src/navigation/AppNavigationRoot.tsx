import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import EntryScreen from '../screens/EntryScreen';
import NewRequestScreen from '../screens/NewRequestScreen';
import RequestsScreen from "../screens/RequestsScreen";
import HoursScreen from "../screens/HoursScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {useAuthState} from "../contexts/AuthContext";
import AppDrawerContent from "./AppDrawerContent";

function LoggedOutNavigator() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen
                name="Entry"
                component={EntryScreen}
                options={{
                    animationTypeForReplace: 'pop'
                }}
            />
        </Stack.Navigator>
    );
}

function LoggedInNavigator() {
    const Drawer = createDrawerNavigator();
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

export default function AppNavigationRoot() {
    const authState = useAuthState();
    return (
        <NavigationContainer>
            {authState.isLoggedIn ? <LoggedInNavigator/> : <LoggedOutNavigator/>}
        </NavigationContainer>
    );
}