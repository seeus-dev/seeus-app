import React from 'react';
import {Alert, StyleSheet, Text, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import Button from "../../components/Button";
import onboardingStyle from './onboarding-screen-style';
import location from "../../services/location";
import {AppActionType, useAppDispatch} from "../../contexts/AppContext";

export default function LocationPermissionScreen({navigation}) {
    const appDispatch = useAppDispatch();

    const showLocationDisabledDialog = () => {
        Alert.alert(
            'Location Disabled',
            'Your location will not be used in the SEEUS app. You can change this anytime by going to settings in the drawer menu.',
            [
                {text: 'OK', onPress: () => appDispatch({type: AppActionType.RequestedLocationPermission})}
            ],
        );
    };
    const enableLocation = async () => {
        const enabled = await location.requestPermission();
        if (!enabled) {
            showLocationDisabledDialog();
        }
    };
    const skip = () => {
        location.setHaveRequestedLocation(true);
        showLocationDisabledDialog();
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText}>Location</Text>
                <Text style={styles.subTitleText}>For the best experience using the SEEUS app, allow location services permission</Text>
                <Button label="Enable Location"
                        onPress={enableLocation}
                        showShadow={true}
                        style={styles.positiveButton}
                        labelStyle={styles.positiveButtonLabel}>
                    <FontAwesome name="location-arrow" size={27} style={{marginRight: 10}}/>
                </Button>
                <Text style={styles.furtherDescriptionText}>
                    Your location is used to display the campus map and nearby locations, and shared with the SEEUS
                    dispatcher only when you submit a request.
                </Text>
            </View>
            <Button label="Skip"
                    onPress={skip}
                    style={styles.negativeButton}
                    labelStyle={styles.negativeButtonLabel}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ...onboardingStyle,
    container: {
        ...onboardingStyle.container,
        justifyContent: 'space-between',
    },
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
    subTitleText: {
        ...onboardingStyle.subTitleText,
        fontSize: 25,
    },
    furtherDescriptionText: {
        color: '#fff',
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 35,
    },
    positiveButton: {
        ...onboardingStyle.positiveButton,
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'row-reverse',
        paddingVertical: 25,
        paddingHorizontal: 30
    },
    positiveButtonLabel: {
        ...onboardingStyle.positiveButtonLabel,
        fontSize: 27,
    },
    negativeButton: {
        ...onboardingStyle.negativeButton,
        flex: 0,
        justifyContent: 'center',
        marginRight: 0
    },
    negativeButtonLabel: {
        ...onboardingStyle.negativeButtonLabel,
        fontSize: 15,
        color: '#eee',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-between',
    }
});