import React, {useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import Button from "../../components/Button";
import onboardingStyle from './onboarding-screen-style';
import {AuthActionType, useAuthDispatch, useAuthState} from "../../contexts/AuthContext";
import {cleanEid, focusTextInput} from "../../util";

export default function EnterEidScreen({navigation}) {
    const [eid, setEid] = useState("");
    const authDispatch = useAuthDispatch();
    const {user} = useAuthState();
    const submit = () => {
        if (eid.length > 0) {
            navigation.navigate('OauthWebView', {username: eid});
        }
    };
    const logout = () => {
        Alert.alert(
            'Logout',
            'Do you want to logout now? You will be prompted to enter your EID when you login next time.',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Logout', onPress: () => authDispatch({type: AuthActionType.Logout})},
            ],
            {cancelable: true}
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText}>Enter your EID</Text>
                <Text style={styles.subTitleText}>SEEUS uses your EID (Eastern ID) number for verification.</Text>
            </View>
            <Text style={styles.emailText}>{user.username}@emich.edu</Text>
            <View style={{flexDirection: 'row'}}>
                <EidInput eid={eid} onChange={setEid}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Button label="Logout"
                        onPress={logout}
                        style={styles.negativeButton}
                        labelStyle={styles.negativeButtonLabel}
                />
                <Button label="Save"
                        onPress={submit}
                        showShadow={true}
                        style={styles.positiveButton}
                        labelStyle={styles.positiveButtonLabel}>
                    <FontAwesome name="arrow-right" size={18} style={{marginLeft: 10}}/>
                </Button>
            </View>
        </View>
    );
}

function EidInput({eid, onChange}) {
    const eidInputRef = useRef(null);
    return (
        <TouchableWithoutFeedback onPress={() => focusTextInput(eidInputRef)}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputStaticText}>E-</Text>
                <TextInput value={eid}
                           onChangeText={text => onChange(cleanEid(text))}
                           ref={eidInputRef}
                           style={styles.input}
                           accessibilityHint="EID"
                           autoFocus={true}
                           autoCorrect={false}
                           autoCapitalize="none"
                           keyboardType="numeric"
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    ...onboardingStyle,
    inputContainer: {
        ...onboardingStyle.inputContainer,
        flexDirection: 'row',
        paddingLeft: 20,
        marginTop: 15
    },
    input: {
        ...onboardingStyle.input,
        paddingLeft: 5
    },
    titleText: {
        ...onboardingStyle.titleText,
        fontSize: 40
    },
    subTitleText: {
        ...onboardingStyle.subTitleText,
        fontSize: 25,
    },
    emailText: {
        color: '#fff',
        fontStyle: 'italic',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 40
    },
    positiveButton: {
        ...onboardingStyle.positiveButton,
        justifyContent: 'center'
    }
});