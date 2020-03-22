import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';

const REQUESTED_PERMISSION_KEY = 'requestedLocationPermission';

async function hasPermission(): Promise<boolean> {
  const { status } = await requestPermission();
  return status === 'granted';
}

async function requestPermission() {
  await setHaveRequestedLocation(true);
  return Location.requestPermissionsAsync();
}

async function haveRequestedPermission(): Promise<boolean> {
  return !!(await AsyncStorage.getItem(REQUESTED_PERMISSION_KEY));
}

function setHaveRequestedLocation(value: boolean) {
  return AsyncStorage.setItem(REQUESTED_PERMISSION_KEY, value ? 'yes' : 'no');
}

async function getCurrentLocation() {
  return Location.getCurrentPositionAsync({});
}

export default {
  hasPermission,
  requestPermission,
  getCurrentLocation,
  haveRequestedPermission,
  setHaveRequestedLocation,
};
