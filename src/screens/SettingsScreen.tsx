import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import baseStyle from "../styles/base";
import { theme } from "../styles/colors";

export default function MainScreen() {
    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...baseStyle.container
    }
});