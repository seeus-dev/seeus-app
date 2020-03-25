import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import baseStyle from '../styles/base';

export default function HoursScreen() {
  return (
    <View style={styles.container}>
      <Text>Hours Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseStyle.container
  }
});
