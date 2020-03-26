import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Linking, Platform } from 'react-native';
import baseStyle from '../styles/base';
import PhoneButton from '../components/PhoneButton';

export default function HelpScreen() {
  function dialCall() {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${7344873387}';
    } else {
      phoneNumber = 'telprompt:${7344873387}';
    }
    Linking.openURL(phoneNumber);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/seeus-logo.png')}
        />
        <Text>Contact SEEUS</Text>
        <PhoneButton
          //  label="734.487.3387"
          style={styles.loginButton}
          labelStyle={styles.loginButtonText}
          showShadow={true}
          onPress={() => dialCall()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseStyle.container,
  },
});
