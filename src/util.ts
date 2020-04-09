import { MutableRefObject } from 'react';
import { NativeModules, TextInput } from 'react-native';

export function focusTextInput(ref: MutableRefObject<TextInput>) {
  const input = ref.current;
  input.blur();
  setTimeout(() => input.focus(), 50);
}

export function cleanUsername(username: string) {
  // remove non-alphanumerical characters and "emich.edu" (in case of auto fill)
  return username.trim().replace(/[^A-Za-z0-9\.]|(emich?.edu)/g, '');
}

export function cleanEid(eid: string) {
  return eid.trim().replace(/[^0-9]+/g, '');
}

export function clearCookies() {
  NativeModules.Networking.clearCookies((cleared) => {
    console.debug('cleared hadCookies: ' + cleared.toString());
  });
}
