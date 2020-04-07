import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Linking } from 'expo';
import { FontAwesome } from '@expo/vector-icons';

import { theme } from '../styles/colors';
import SeeusConstants from '../SeeusConstants';
import {
  AuthActionType,
  useAuthDispatch,
  useAuthState,
} from '../contexts/AuthContext';

/**
 * This component is what is displayed in the main navigation drawer.
 * It renders the list of screens provided in AppNavigationRoot, and some extra components.
 */
export default function AppDrawerContent(props) {
  const authDispatch = useAuthDispatch();
  const authState = useAuthState();
  const doLogout = () => authDispatch({ type: AuthActionType.Logout });
  if (!authState.isLoggedIn) {
    return null;
  }
  return (
    <>
      <Header
        name={authState.user.name || authState.user.username}
        email={authState.user.eid}
        imageUrl={authState.user.imageUrl}
      />
      <DrawerContentScrollView style={styles.scrollView} {...props}>
        <DrawerItemList
          itemStyle={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
          activeBackgroundColor={styles.drawerItemLabelActive.backgroundColor}
          activeTintColor={styles.drawerItemLabelActive.color}
          {...props}
        />
        <DrawerItem
          label="Logout"
          onPress={doLogout}
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
        />
      </DrawerContentScrollView>
      <Footer />
    </>
  );
}

function Header(props: { name: string; email: string; imageUrl: string }) {
  const { name, email, imageUrl } = props;
  const image = imageUrl
    ? { uri: imageUrl }
    : require('../../assets/user-icon.png');
  return (
    <View style={styles.header}>
      <Image source={image} style={styles.headerUserImage} />
      <View style={styles.headerUserInfoContainer}>
        <Text style={styles.headerUserName}>{name}</Text>
        <Text style={styles.headerUserEmail}>{email}</Text>
      </View>
    </View>
  );
}

function Footer() {
  return (
    <SafeAreaView style={styles.footer}>
      <Text style={styles.footerText}>Follow SEEUS on</Text>
      <View style={styles.footerIcons}>
        <TouchableOpacity
          onPress={() => Linking.openURL(SeeusConstants.SEEUS_FACEBOOK_URL)}
        >
          <FontAwesome name="facebook" style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(SeeusConstants.SEEUS_TWITTER_URL)}
        >
          <FontAwesome name="twitter" style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 0,
    margin: 0,
    padding: 0,
    backgroundColor: theme.primary,
  },
  drawerItem: {
    borderRadius: 0,
    marginHorizontal: 0,
  },
  drawerItemLabel: {
    color: '#fff',
    fontSize: 23,
    paddingLeft: 10,
  },
  drawerItemLabelActive: {
    backgroundColor: theme.primaryLighter,
    color: '#fff',
  },
  header: {
    backgroundColor: theme.secondary,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 30,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerUserImage: (function () {
    const dimen = screenWidth < 400 ? 55 : 70;
    return {
      width: dimen,
      height: dimen,
      borderRadius: 100,
      opacity: 0.85,
    };
  })(),
  headerUserInfoContainer: {
    alignItems: 'center',
    marginLeft: 20,
  },
  headerUserName: {
    color: '#222',
    fontSize: 23,
    fontWeight: 'bold',
  },
  headerUserEmail: {
    color: '#222',
    fontSize: 14,
  },
  footer: {
    paddingVertical: 10,
    backgroundColor: theme.primaryLighter,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerText: {
    color: '#eee',
  },
  footerIcons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerIcon: {
    marginHorizontal: screenWidth < 400 ? 7 : 10,
    color: '#eee',
    fontSize: 35,
  },
});
