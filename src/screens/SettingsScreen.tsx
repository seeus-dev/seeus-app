import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import baseStyle from '../styles/base';
import { AntDesign } from '@expo/vector-icons';
import Button from '../components/Button';

export default function SettingsScreen() {
  return (
    <View>
      <Text style={styles.header}> Settings</Text>
      <Text style={styles.user}> User Name & EID</Text>
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
    paddingTop: 50,
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
    backgroundColor: '#0d6d46',
    color: 'white',
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
