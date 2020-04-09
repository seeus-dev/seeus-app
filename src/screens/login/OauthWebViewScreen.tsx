import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import baseStyle from '../../styles/base';
import WebView from 'react-native-webview';
import { AuthActionType, useAuthDispatch } from '../../contexts/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { clearCookies } from '../../util';
import { OAUTH_URL } from '../../services/api';

type ScreenProps = {
  route: any;
  navigation: StackNavigationProp<any>;
};

const WEB_VIEW_USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) ' +
  'AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 ' +
  'Safari/602.1';

export default function OauthWebViewScreen(props: ScreenProps) {
  const { route, navigation } = props;
  const { username } = route.params;
  const authDispatch = useAuthDispatch();
  const [loading, setLoading] = useState(true);
  const [finalLoading, setFinalLoading] = useState(false);
  const showLoadingScreen = loading || finalLoading;
  const webviewUrl = OAUTH_URL + username;

  // Clear the web view cookies on first render
  useEffect(clearCookies, []);

  function onWebViewMessage(event) {
    let msg = event.nativeEvent.data;
    if (msg == 'finalLoading' && !finalLoading) {
      setFinalLoading(true);
    }
    try {
      msg = JSON.parse(msg);
    } catch (e) {}
    console.log('Received Web View Message: ', msg);
    if (msg.user) {
      authDispatch({ type: AuthActionType.Login, user: msg.user });
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {showLoadingScreen && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={30} />
      </TouchableOpacity>
      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: webviewUrl }}
          originWhitelist={['*']}
          allowsLinkPreview={false}
          injectedJavaScript={webViewInjectedJs(username, webviewUrl)}
          style={styles.webView}
          onShouldStartLoadWithRequest={() => true}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onMessage={onWebViewMessage}
          accessibilityHint="emich.edu login"
          userAgent={WEB_VIEW_USER_AGENT}
        />
      </View>
    </View>
  );
}

// This code is ran inside the webview itself
function webViewInjectedJs(username, webviewUrl) {
  return `
    // Auto fill username on EMU login screen
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password')
    if(usernameField) usernameField.value = '${username}';
    if(passwordField) passwordField.value = '';
    
    // Duo verification overflows and doesn't scroll; force enable scrolling
    const content = document.getElementById('content');
    if(content) content.style.overflow = 'scroll';
    
    // EMU CAS breaks the oauth flow. To get around this, check whether we 
    // have gotten to "Log In Successful" screen, then start oauth again
    const msgBox = document.getElementById('msg');
    if(msgBox) {
      const isSuccessMsgBoxPresent = Array.from(msgBox.children)
        .filter(ele => ele.textContent.includes('Log In Successful'))
        .length > 0;
      if(isSuccessMsgBoxPresent) {
        window.ReactNativeWebView.postMessage('finalLoading');
        window.location = '${webviewUrl}';
      }
    }
  `;
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
  },
});
