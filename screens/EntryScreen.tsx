import React from 'react';
import {Image, StyleSheet, TouchableHighlight, TouchableOpacity, View, Text} from "react-native";
import baseStyle from "../styles/base";
import {theme} from "../styles/colors";
import {AuthActionType, useAuthDispatch} from "../contexts/AuthContext";

export default function EntryScreen(props) {
    const authDispatch = useAuthDispatch();
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/seeus-logo.png')}/>
            <TouchableOpacity style={styles.loginButton} onPress={() => authDispatch({ type: AuthActionType.Login})}>
                <Text style={styles.loginButtonText}>Login with NetID</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...baseStyle.container,
        backgroundColor: theme.primary,
    },
    logo: {},
    loginButton: {
        backgroundColor: theme.secondary,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginTop: 50,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 15,
        borderRadius: 4
    },
    loginButtonText: {
        fontSize: 22
    }
});