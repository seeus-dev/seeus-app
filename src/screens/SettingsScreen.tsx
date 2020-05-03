import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import baseStyle from '../styles/base';
import { AntDesign } from '@expo/vector-icons';
import Button from '../components/Button';
import {
  AuthActionType,
  useAuthDispatch,
  useAuthState,
} from '../contexts/AuthContext';

export default function SettingsScreen() {
  const authState = useAuthState();
  return (
    <View>
      <Text style={styles.header}> Settings</Text>
      <Text style={styles.user}>
        {' '}
        {'Username: ' +
          authState.user.username +
          '\n EID: ' +
          authState.user.eid}{' '}
      </Text>
      <Button
        label="Change Name  "
        style={styles.button}
        labelStyle={styles.textlist}
        showShadow={true}
      >
        <AntDesign name="rightcircleo" size={30} />
      </Button>
      <Button
        label="Change Picture  "
        style={styles.button}
        labelStyle={styles.textlist}
        showShadow={true}
      >
        <AntDesign name="rightcircleo" size={30} />
      </Button>

      <Button
        label="Location Services "
        style={styles.button}
        labelStyle={styles.textlist}
        showShadow={true}
      >
        <AntDesign name="checkcircleo" size={30} />
      </Button>
      <Button
        label="Logout "
        style={styles.button}
        labelStyle={styles.textlist}
        showShadow={true}
      >
        <AntDesign name="rightcircleo" size={30} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseStyle.container,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 35,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0d6d46',
    color: 'white',
  },
  user: {
    paddingTop: 20,
    fontSize: 35,
    textAlign: 'center',
    color: 'black',
  },
  textlist: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 40,
    justifyContent: 'center',
  },
  button: {
    paddingBottom: 15,
  },
});
