import React, { ReactChild } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { theme } from '../styles/colors';
import Button from '../components/Button';

function dialCall() {
  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = 'tel:7344873387';
  } else {
    phoneNumber = 'telprompt:7344873387';
  }
  Linking.openURL(phoneNumber);
}

export default function PhoneButton(props: ButtonProps) {
  return (

    <Button style={styles.button} onPress={() => dialCall()}>
      <Image
        style={styles.image}
        source={require('../../assets/phone-icon.png')}
      />
      <Text style={styles.label}>734.487.3387</Text>
      {props.children}
      </Button>


  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,

    backgroundColor: theme.secondary,

    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonShadow: {
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 3,
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  image: {
    flex: 0,
    width: 40,
    height: 50,
    resizeMode: 'contain',
  },
});
