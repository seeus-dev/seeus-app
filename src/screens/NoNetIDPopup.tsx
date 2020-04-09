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
    <View style={styles.mainContainer}>
      <View style={styles.toolbarContainer}>
        <View style={styles.toolbar}>
            <Button
                label= "X"
                style={styles.backButton}
                labelStyle={styles.backButtonText}
                showShadow={true}
                onPress={() => props.navigation.goBack()}
            />
        </View>
        <View style={styles.toolbarTextContainer}>
            <Text style={styles.titleText}> No NetID? </Text>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <Text style={styles.titleText}> If you do not have an @emich.edu email account, please call SEEUS for service. </Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}> Seeus Number: </Text>
        <Button
            label= "734-487-3387"
            style={styles.phoneButton}
            labelStyle={styles.phoneButtonText}
            showShadow={true}
            onPress={() => makeCall()}
        />
      </View>
      <View style={styles.mainContainer}>
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
  mainContainer: {
    ...baseStyle.container,
    backgroundColor: colors.white,
    flex: 1,
    height: '100%',
  },
  toolbarContainer: {
     backgroundColor: colors.seeusYellow,
     flexDirection: 'row',
     alignContent: 'center',
     height: 60,
     borderWidth: 1,
  },
  toolbar: {
      backgroundColor: colors.seeusYellow,
      flexDirection: 'row',
      alignItems: 'flex-end',
      flex: 1,
      height: '100%',
      width: '100%',
  },
  toolbarTextContainer: {
      backgroundColor: colors.seeusYellow,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      flex: 6,
      height: '100%',
      width: '100%',

  },
  phoneButton: {
      backgroundColor: colors.seeusYellow,
      alignItems: 'flex-end',
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
  backButton: {
      backgroundColor: colors.black,
  },
  backButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'left',
  },
});
