import React from 'react';
import {StyleSheet, View} from "react-native";
import baseStyle from '../../styles/base';
import WebView from "react-native-webview";
import {AuthActionType, useAuthDispatch} from "../../contexts/AuthContext";


export default function OauthWebViewScreen({route, navigation}) {
    const { username } = route.params;
    const authDispatch = useAuthDispatch();

    const onWebViewNavigate = (event) => {
        if(event.canGoBack && event.loading) {
            authDispatch({type: AuthActionType.Login, user: { username }});
        }
    };

    const webViewInjectedJs = `
        document.getElementById('username').value = '${username}';
        document.getElementById('password').value = '';
    `;

    // TODO: use oauth url here (url from backend which will redirect to google/emich login page)
    const oauthUrl = 'https://my.emich.edu';

    return (
        <View style={styles.container}>
            <View style={styles.webViewContainer}>
                <WebView source={{uri: oauthUrl}}
                         originWhitelist={['*']}
                         allowsLinkPreview={false}
                         injectedJavaScript={webViewInjectedJs}
                         onNavigationStateChange={onWebViewNavigate}
                         style={styles.webView}
                         accessibilityHint="emich.edu login"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...baseStyle.container,
        flexDirection: 'column'
    },
    webViewContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    webView: {
    }
});