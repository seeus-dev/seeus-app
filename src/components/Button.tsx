import React from 'react';
import {StyleSheet, StyleSheetProperties, Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import colors from "../styles/colors";

type ButtonProps = {
    label: String
    onPress: (event) => void,
    style: ViewStyle,
    labelStyle: TextStyle,
    activeOpacity?: number
}

export default function Button(props: ButtonProps) {
    const buttonStyle = {...styles.button, ...props.style};
    const labelStyle = {...styles.label, ...props.labelStyle};
    return (
        <TouchableOpacity activeOpacity={props.activeOpacity || 0.5} style={buttonStyle} onPress={props.onPress}>
            <Text style={labelStyle}>{props.label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        marginTop: 50,
        paddingVertical: 20,
        paddingHorizontal: 20,

        backgroundColor: colors.seeusYellow,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

        borderRadius: 3,
    },
    label: {
        fontSize: 20,
    },
});