import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
} from 'react-native';
import colors, { theme } from '../styles/colors';
import Constants from 'expo-constants';

const DATA = [
  {
    title: 'Request A Walk',
    data: [
      'Sun     5PM-3AM',
      'Mon     5PM-1AM',
      'Tue     5PM-1AM',
      'Wed     5PM-1AM',
      'Thu     5PM-1AM',
      'Fri     5PM-1AM',
      'Sat     5PM-1AM',
    ],
  },
  {
    title: 'Request SeeUs Van',
    data: [
      'Sun     10PM-3AM',
      'Mon     10PM-3AM',
      'Tue     10PM-3AM',
      'Wed     10PM-3AM',
      'Thu     10PM-3AM',
      'Fri     9PM-1AM',
      'Sat     9PM-1AM',
    ],
  },
  {
    title: 'Request A Jump/Unlock',
    data: [
      'Sun     CLOSED',
      'Mon     5PM-10PM',
      'Tue     5PM-10PM',
      'Wed     5PM-10PM',
      'Thu     5PM-10PM',
      'Fri     5PM-10PM',
      'Sat     CLOSED',
    ],
  },
];

const Item = ({ title }: { title: string }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
);

export default App;

export default function HoursScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.primary,
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: colors.seeusYellow,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginVertical: 1,
    alignItems: 'flex-start',
  },
  header: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 25,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
  },
});
