import React from 'react';
import {Image, StyleSheet, TouchableHighlight, TouchableOpacity, View, Text} from "react-native";
import baseStyle from "../styles/base";
import colors, {theme} from "../styles/colors";
import {AuthActionType, useAuthDispatch} from "../contexts/AuthContext";
import Button from "../components/Button";

export default function EntryScreen(props) {
    const authDispatch = useAuthDispatch();
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image style={styles.logo} source={require('../../assets/seeus-logo.png')}/>
                <Button label="Login with NetID"
                        style={styles.loginButton}
                        labelStyle={styles.loginButtonText}
                        onPress={() => authDispatch({ type: AuthActionType.Login})} />
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
        backgroundColor: colors.seeusYellow,
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
    }
});