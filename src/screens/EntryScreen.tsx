import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import baseStyle from '../styles/base';
import colors, { theme } from '../styles/colors';
import Button from '../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';

export default function EntryScreen(props: {
  navigation: StackNavigationProp<any>;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/seeus-logo.png')}
          />
        </View>
        <Button
          label="Login with NetID"
          style={styles.loginButton}
          labelStyle={styles.loginButtonText}
          showShadow={true}
          onPress={() => props.navigation.navigate('Login')}
        />
      </View>
      <TouchableOpacity
        onPress={() => alert('TODO: Navigate to the No Net ID Popup Screen')}
      >
        <Text style={styles.noNetIdLink}>No NetID? Tap here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseStyle.container,
    backgroundColor: theme.primary,
    paddingBottom: 0
  },
  logoContainer: {
    flexDirection: 'row',
    width: '80%'
  },
  logo: {
    marginBottom: 10
  },
  loginButton: {
    backgroundColor: colors.seeusYellow
  },
  loginButtonText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  noNetIdLink: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 15
  }
});
