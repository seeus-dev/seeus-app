import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import { PermissionResponse, PermissionStatus } from 'expo-location';

const REQUESTED_PERMISSION_KEY = 'requestedLocationPermission';

async function requestPermission(): Promise<PermissionResponse> {
  const perm = await Location.requestPermissionsAsync();
  await savePermission(perm.status === PermissionStatus.GRANTED);
  return perm;
}

async function requestPermissionBoolean(): Promise<boolean> {
  return requestPermission().then(
    perm => perm.status === PermissionStatus.GRANTED
  );
}

async function hasPermissionCached(doRequest = false): Promise<boolean> {
  const val = await AsyncStorage.getItem(REQUESTED_PERMISSION_KEY);
  if (doRequest && val == undefined) {
    return requestPermissionBoolean();
  }
  return val === 'yes';
}

async function hasPreviouslyRequested() {
  return (await getSavedPermission()) !== undefined;
}

function savePermission(value: boolean) {
  return AsyncStorage.setItem(REQUESTED_PERMISSION_KEY, value ? 'yes' : 'no');
}

function getSavedPermission() {
  return AsyncStorage.getItem(REQUESTED_PERMISSION_KEY);
}

async function getCurrentLocation() {
  return Location.getCurrentPositionAsync({});
}

export default {
  hasPreviouslyRequested,
  requestPermission,
  requestPermissionBoolean,
  getCurrentLocation,
  hasPermissionCached
};
