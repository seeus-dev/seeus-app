import React, { ReactChild } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import { theme } from '../styles/colors';

type ButtonProps = {
  label: string;
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
      <Text style={labelStyle}>{props.label}</Text>
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
    justifyContent: 'space-around'
  },
  buttonShadow: {
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 3
  },
  label: {
    fontSize: 20
  }
});
