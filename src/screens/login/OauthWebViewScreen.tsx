import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import baseStyle from '../../styles/base';
import WebView from "react-native-webview";
import {AuthActionType, useAuthDispatch} from "../../contexts/AuthContext";
import {AntDesign} from "@expo/vector-icons";

export default function OauthWebViewScreen({route, navigation}) {
    const {username} = route.params;
    const authDispatch = useAuthDispatch();
    const [loading, setLoading] = useState(true);

    const onWebViewNavigate = useCallback((event) => {
        if (event.canGoBack && event.loading) {
            console.log("Logging in. Web View Event = ", event);
            authDispatch({type: AuthActionType.Login, user: {username}});
        }
    }, [username]);

    const webViewInjectedJs = `
        document.getElementById('username').value = '${username}';
        document.getElementById('password').value = '';
    `;

    // TODO: use oauth url here (url from backend which will redirect to google/emich login page)
    const oauthUrl = 'https://my.emich.edu';

    return (
        <View style={styles.container}>
            {loading &&
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" style={styles.loading}/>
            </View>}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <AntDesign name="arrowleft" size={30}/>
            </TouchableOpacity>
            <View style={styles.webViewContainer}>
                <WebView source={{uri: oauthUrl}}
                         originWhitelist={['*']}
                         allowsLinkPreview={false}
                         injectedJavaScript={webViewInjectedJs}
                         onNavigationStateChange={onWebViewNavigate}
                         style={styles.webView}
                         onLoadStart={() => setLoading(true)}
                         onLoadEnd={() => setLoading(false)}
                         accessibilityHint="emich.edu login"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...baseStyle.container,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    loadingContainer: {
        position: 'absolute',
        zIndex: 2,
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
    },
    loading: {},
    webViewContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    webView: {},
    backButton: {
        alignSelf: 'flex-start',
        padding: 10,
    }
});