import { Image, StyleSheet, TouchableOpacity, View, Text, Alert, Linking, Platform, Dimensions } from 'react-native';
import React from 'react';
import baseStyle from '../styles/base';
import colors, { theme } from '../styles/colors';
import Button from '../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';


export default function NoNetIDPopup(props: {
    navigation: StackNavigationProp<any>;
    }) {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Button
            label= "X"
            style={styles.backButton}
            labelStyle={styles.backButtonText}
            showShadow={true}
            onPress={() => props.navigation.goBack()}
        />
        <Text style={styles.titleText}> No NetID </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.titleText}> If you do not have an @emich.edu email account, please call SEEUS for service. </Text>
        <Button
            label= "734-487-3387"
            style={styles.phoneButton}
            labelStyle={styles.phoneButtonText}
            showShadow={true}
            onPress={() => makeCall()}
        />
      </View>
    </View>
  );
}

function makeCall()
{
    let phoneNumber = '';

    if(Platform.OS === 'android') {
     phoneNumber = 'tel:7344873387';
	} else {
     phoneNumber = 'telprompt:7344873387';
	}

    Linking.openURL(phoneNumber);
    return(null);
}



const styles = StyleSheet.create({
  container: {
    ...baseStyle.container,
    backgroundColor: colors.white,
    paddingBottom: 200,
  },
  toolbar: {
      ...baseStyle.container,
      backgroundColor: colors.seeusYellow,
      borderWidth: 2,
      width: Dimensions.get('window').width,
      marginBottom: 120,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      paddingLeft: 10,
  },
  phoneButton: {
      backgroundColor: colors.seeusYellow,
  },
  titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.black,
        textAlign: 'center',
  },
  phoneButtonText: {
      fontSize: 30,
      fontWeight: 'bold',
  },
  content: {
      flex: 1,
      justifyContent: 'center',
  },
  backButton: {
      backgroundColor: colors.white,
      marginRight: 45,
      marginBottom: 6,
  },
  backButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.black,
      textAlign: 'left',
  },
});
