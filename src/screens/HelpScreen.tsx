import React, { ReactChild } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import baseStyle from '../styles/base';
import PhoneButton from '../components/PhoneButton';
import Button from '../components/Button';
import { Feather } from "@expo/vector-icons";



export default function HelpScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/seeus-logo.png')}
        />
        <Text style={styles.text}>Contact SEEUS</Text>
         <PhoneButton/>
         <Text style={styles.text2}>Found a problem with the SEEUS App?</Text>
         <Button
           label="Report Bug  "
           style={styles.reportButton}
           labelStyle={styles.labelR}
           showShadow={true}
          // onPress={}
         >
         <Feather  name="alert-circle" size={25} />
         </Button>
         <Text style={styles.text3}>Version: 0.1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseStyle.container,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBottom: 20,
  },
  logo: {
    paddingTop: 100,
    width:125,
    height: 125,
    shadowOffset: { width: .5, height: .5 },
    shadowColor: '#000',
    shadowOpacity: 0.5,
  //  elevation: 10,

  },

  text:
  {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 1,
  },

  text2:
  {
    fontSize: 20,
    paddingTop: 200,
    fontWeight: 'bold',
  },

   reportButton:
  {
    paddingBottom: 15,
  },

  labelR:
  {
    fontSize: 28,
    fontWeight: 'bold',
  },
  text3:
  {
    fontSize: 20,
  color: 'gray'
  },
});
