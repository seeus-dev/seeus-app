import React, { useRef, useState } from 'react';
import {
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../components/Button';
import onboardingStyle from './onboarding-screen-style';
import { cleanUsername, focusTextInput } from '../../util';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function LoginScreen(props: ScreenProps) {
  const [username, setUsername] = useState('');
  const submit = () => {
    if (username.length > 0) {
      props.navigation.navigate('OauthWebView', { username });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View>
          <Text style={styles.titleText}>Welcome</Text>
          <Text style={styles.subTitleText}>
            Let&apos;s start by entering your NetID
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <UsernameInput username={username} onChange={setUsername} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            label="Cancel"
            onPress={() => props.navigation.goBack()}
            style={styles.negativeButton}
            labelStyle={styles.negativeButtonLabel}
          />
          <View style={{ flex: 1 }} />
          <Button
            label="Continue"
            onPress={submit}
            showShadow={true}
            style={styles.positiveButton}
            labelStyle={styles.positiveButtonLabel}
          >
            <FontAwesome name="arrow-right" size={18} />
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function UsernameInput(props: {
  username: string;
  onChange: (string) => void;
}) {
  const { username, onChange } = props;
  const usernameInputRef = useRef(null);
  return (
    <TouchableWithoutFeedback onPress={() => focusTextInput(usernameInputRef)}>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          onChangeText={(text) => onChange(cleanUsername(text))}
          ref={usernameInputRef}
          style={styles.input}
          selectionColor="#fff"
          accessibilityHint="NetID Username"
          autoFocus={true}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.inputStaticText}>@emich.edu</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  ...onboardingStyle,
  inputContainer: {
    ...onboardingStyle.inputContainer,
    flexDirection: 'row',
  },
  positiveButton: {
    ...onboardingStyle.positiveButton,
    flex: 0,
  },
  positiveButtonLabel: {
    ...onboardingStyle.positiveButtonLabel,
    marginRight: 15,
  },
});
