import React from 'react';
import {Image, StyleSheet, TouchableHighlight, TouchableOpacity, View, Text} from "react-native";
import baseStyle from "../styles/base";
import colors, {theme} from "../styles/colors";
import {AuthActionType, useAuthDispatch} from "../contexts/AuthContext";

export default function EntryScreen(props) {
    const authDispatch = useAuthDispatch();
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image style={styles.logo} source={require('../assets/seeus-logo.png')}/>
                <TouchableOpacity activeOpacity={0.5} style={styles.loginButton} onPress={() => authDispatch({ type: AuthActionType.Login})}>
                    <Text style={styles.loginButtonText}>Login with NetID</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {}}>
                <Text style={styles.noNetIdLink}>No NetID? Tap here</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...baseStyle.container,
        backgroundColor: theme.primary,
        flexDirection: 'column',
    },
    logo: {
        marginBottom: 30,
    },
    loginButton: {
        alignItems: 'center',
        marginTop: 50,
        paddingVertical: 20,
        paddingHorizontal: 20,

        backgroundColor: colors.seeusYellow,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

        borderRadius: 3,
    },
    loginButtonText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    noNetIdLink: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 15,
        textShadowColor: '#000',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 1,
            height: 0
        }
    }
});