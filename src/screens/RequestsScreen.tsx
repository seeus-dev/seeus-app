import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import baseStyle from '../styles/base';

/**
 * This screen shows the users' scheduled and previous (completed) escort requests
 */
export default function RequestsScreen() {
  return (
    <View style={styles.container}>
      <Text>Escort Requests</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseStyle.container
  }
});
