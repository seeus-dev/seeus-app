import React, {useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

export default function App() {
    const [smile, updateSmile] = useState(false);
    const [count, updateCount] = useState(0);

    const showSad = Math.round(Math.random() * 10) == 5;

    const update = () => {
        updateCount(count+1);
        updateSmile(!smile);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hello!</Text>
            <Text style={styles.intro}>Everything is fine</Text>
            <TouchableWithoutFeedback onPress={update}>
                <View style={styles.box}>
                    <Text style={{fontSize: 60}}>
                        {showSad ? '😇' : (smile ? '😎' : '😀')}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <Text style={{ color: '#fff' }}>{ count }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1eaa66',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
      color: '#fff',
      fontSize: 60,
      fontWeight: 'bold'
    },
    intro: {
        backgroundColor: '#fff',
        color: '#1eaa66',
        padding: 30,
        borderRadius: 10,
        fontSize: 25,
        margin: 25
    },
    box: {
        borderWidth: 1,
        borderColor: '#1eaa66',
        width: 150,
        height: 150,
        margin: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    }
});
