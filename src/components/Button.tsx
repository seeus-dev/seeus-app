import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../styles/colors";

export default function Button(props) {
    const buttonStyle = { ...styles.button, ...props.style };
    const textStyle = { ...styles.buttonText, ...props.textStyle };
    return (
        <TouchableOpacity activeOpacity={0.5} style={buttonStyle} onPress={props.onPress}>
            <Text style={textStyle}>{ props.text }</Text>
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
    buttonText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
});