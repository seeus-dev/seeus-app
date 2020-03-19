import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import baseStyle from "../styles/base";
import Button from "../components/Button";
import colors, {theme} from "../styles/colors";

import {AuthActionType, useAuthDispatch} from "../contexts/AuthContext";

export default function LoginScreen({navigation}) {
    const [username, setUsername] = useState("");
    const authDispatch = useAuthDispatch();
    const submit = () => {
        // TODO: open web view to login with google oauth
        authDispatch({ type: AuthActionType.Login, username });
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Hello.</Text>
                <Text style={styles.headerTextSmaller}>Let's start by entering your NetID</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <UsernameInput username={username} setUsername={setUsername}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Button label="Cancel"
                        onPress={() => navigation.goBack()}
                        style={styles.cancelButton}
                        labelStyle={styles.cancelButtonLabel}
                />
                <Button label="Continue"
                        onPress={submit}
                        showShadow={true}
                        style={styles.submitButton}
                        labelStyle={styles.submitButtonLabel}>
                    <FontAwesome name="arrow-right" size={18} />
                </Button>
            </View>
        </View>
    );
}

function UsernameInput({username, setUsername}) {
    const usernameInputRef = useRef(null);
    const focusInput = () => {
        const input = usernameInputRef.current;
        input.blur();
        setTimeout(() => input.focus(), 50);
    };
    const setUsernameClean = username => {
        // remove non-alphanumerical characters and "emich.edu"
        setUsername(username.replace(/[^A-Za-z0-9\.]|(emich?.edu)/g, ""));
    };

    return (
        <TouchableWithoutFeedback onPress={focusInput}>
            <View style={styles.usernameInputContainer}>
                <TextInput ref={usernameInputRef}
                           onChangeText={text => setUsernameClean(text)}
                           value={username}
                           style={styles.usernameInput}
                           accessibilityHint="NetID Username"
                           autoFocus={true}
                           autoCorrect={false}
                           autoCapitalize="none"
                />
                <Text style={styles.emichEmailText}>@emich.edu</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        ...baseStyle.container,
        backgroundColor: theme.primary,
        justifyContent: 'flex-start',
        paddingTop: 50,
        padding: 20,
    },
    headerText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerTextSmaller: {
        fontSize: 35,
        color: '#fff',
    },
    usernameInputContainer: {
        marginTop: 50,
        paddingRight: 10,
        backgroundColor: theme.primaryLighter,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    usernameInput: {
        minWidth: 0,
        paddingVertical: 20,
        paddingLeft: 15,
        paddingRight: 5,
        marginRight: 0,
        flex: 1,
        color: '#fff',
        fontSize: 30,
        backgroundColor: null,
    },
    emichEmailText: {
        fontSize: 30,
        color: '#fff',
        opacity: 0.6,
    },
    submitButton: {
        backgroundColor: colors.seeusYellow,
        flex: 1,
    },
    submitButtonLabel: {
        fontWeight: 'bold'
    },
    cancelButton: {
        backgroundColor: null,
        flex: 1,
        marginRight: 70,
        justifyContent: 'flex-start',
    },
    cancelButtonLabel: {
        color: '#fff',
    }
});