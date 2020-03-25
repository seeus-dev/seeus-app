import { Platform, StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  text: {
    fontSize: 14
  }
});
