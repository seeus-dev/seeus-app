import React, { ReactChild } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { theme } from '../styles/colors';

type ButtonProps = {

  onPress: (event) => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  activeOpacity?: number;
  showShadow?: boolean;
  children?: ReactChild;
};

export default function Button(props: ButtonProps) {
  const shadowStyle = props.showShadow ? styles.buttonShadow : {};
  const buttonStyle = { ...styles.button, ...props.style, ...shadowStyle };
  const labelStyle = { ...styles.label, ...props.labelStyle };
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity || 0.5}
      style={buttonStyle}
      onPress={props.onPress}
    >
    <Image
    style={styles.image}
    source={require('../../assets/phone-icon.png')}
  />
      <Text style={labelStyle}>734.487.3387</Text>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,

    backgroundColor: theme.secondary,

    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonShadow: {
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 3,
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  image: {
    flex: 0,
    width: 40,
    height: 50,
    resizeMode: 'contain' }
});
