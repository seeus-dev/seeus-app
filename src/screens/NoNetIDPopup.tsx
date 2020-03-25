import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import baseStyle from '../styles/base';

export default function NoNetIDPopup() {
  return (
    <View style={styles.container}>
      <Text>No Net ID</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseStyle.container,
  },
});
