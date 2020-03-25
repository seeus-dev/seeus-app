import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import baseStyle from '../../styles/base';
import WebView from 'react-native-webview';
import { AuthActionType, useAuthDispatch } from '../../contexts/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export default function OauthWebViewScreen(props: {
  route: RouteProp<any, any>;
  navigation: StackNavigationProp<any>;
}) {
  const { route, navigation } = props;
  const { username } = route.params;
  const authDispatch = useAuthDispatch();
  const [loading, setLoading] = useState(true);

  const onWebViewMessage = useCallback(
    event => {
      const msg = event.nativeEvent.data;
      console.log('Logging in. Web View Message = ', msg);
      authDispatch({ type: AuthActionType.Login, user: { username } });
    },
    [username]
  );

  const webViewInjectedJs = `
        document.getElementById('username').value = '${username}';
        document.getElementById('password').value = '';
        
        // temporary until we have our 'oauth complete' page in the webview to call postMessage
        document.getElementById('fm1').onsubmit = function(event) {
            event.preventDefault();
            if(window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage('submit');
            }
            return false;
        };
    `;

  // TODO: use oauth url here (url from backend which will redirect to google/emich login page)
  const oauthUrl = 'https://my.emich.edu';

  return (
    <View style={styles.container}>
      {loading && (
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
          source={{ uri: oauthUrl }}
          originWhitelist={['*']}
          allowsLinkPreview={false}
          injectedJavaScript={webViewInjectedJs}
          style={styles.webView}
          onShouldStartLoadWithRequest={() => true}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onMessage={onWebViewMessage}
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
    backgroundColor: '#fff'
  },
  loadingContainer: {
    position: 'absolute',
    zIndex: 2,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center'
  },
  loading: {},
  webViewContainer: {
    flexDirection: 'row',
    flex: 1
  },
  webView: {},
  backButton: {
    alignSelf: 'flex-start',
    padding: 10
  }
});
