import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../components/Button';
import onboardingStyle from './onboarding-screen-style';
import location from '../../services/location';
import { AppActionType, useAppDispatch } from '../../contexts/AppContext';

export default function LocationPermissionScreen() {
  const appDispatch = useAppDispatch();

  const showLocationDisabledDialog = () => {
    Alert.alert(
      'Location Disabled',
      'Your location will not be used in the SEEUS app. You can change this anytime by going to settings in the drawer menu.',
      [
        {
          text: 'OK',
          onPress: () =>
            appDispatch({ type: AppActionType.SetLocationDisabled }),
        },
      ]
    );
  };
  const enableLocation = async () => {
    const enabled: boolean = await location.requestPermissionBoolean();
    if (!enabled) {
      showLocationDisabledDialog();
    } else {
      appDispatch({ type: AppActionType.SetLocationEnabled });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Location</Text>
        <Text style={styles.subTitleText}>
          SEEUS uses your location to display the EMU campus map, list nearby
          locations, and to help our dispatcher send the nearest walking group.
        </Text>
        <Button
          label="Continue"
          onPress={enableLocation}
          showShadow
          style={styles.positiveButton}
          labelStyle={styles.positiveButtonLabel}
        >
          <FontAwesome
            name="location-arrow"
            size={30}
            style={{ marginRight: 10 }}
          />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...onboardingStyle,
  container: {
    ...onboardingStyle.container,
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
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  positiveButtonLabel: {
    ...onboardingStyle.positiveButtonLabel,
    fontSize: 30,
  },
  negativeButton: {
    ...onboardingStyle.negativeButton,
    flex: 0,
    justifyContent: 'center',
    marginRight: 0,
  },
  negativeButtonLabel: {
    ...onboardingStyle.negativeButtonLabel,
    fontSize: 15,
    color: '#eee',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
