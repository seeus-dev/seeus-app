import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import baseStyle from '../styles/base';
import colors, { theme } from '../styles/colors';

export default function EntryScreen(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('../../assets/seeus-logo.png')}
        />
        <Button
          label="Login with NetID"
          style={styles.loginButton}
          labelStyle={styles.loginButtonText}
          showShadow={true}
          onPress={() => props.navigation.navigate('Login')}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.noNetIdLink}>No NetID? Tap here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseStyle.container,
    backgroundColor: theme.primary,
  },
  logo: {
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: colors.seeusYellow,
  },
  loginButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  noNetIdLink: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
});
