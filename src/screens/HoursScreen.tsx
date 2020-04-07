import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, SectionList} from 'react-native';
import baseStyle from '../styles/base';
import colors, { theme } from '../styles/colors';
import Constants from "expo-constants";

const DATA = [
  {
    title: "Request A Walk",
    data:
    ["Sun                                 5:00pm-3:00am",
     "Mon                                 5:00pm-1:00am",
     "Tue                                 5:00pm-1:00am",
     "Wed                                 5:00pm-1:00am",
     "Thu                                 5:00pm-1:00am",
     "Fri                                 5:00pm-1:00am",
     "Sat                                 5:00pm-1:00am",

    ]
  },
  {
    title: "Request SeeUs Van",
    data: ["", "", "","",""]
  },
  {
    title: "Request A Jump/Unlock",
    data: ["", "", "","",""]
  }
];

const Item = ({title}) => (
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
  return (
    <View style={styles.container}>
    </View>
  );
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
    paddingHorizontal: 25,
    marginVertical: 1,
    alignItems: 'flex-start',
  },
  header: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 25,
    backgroundColor: "#fff",
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    textAlign: 'center'
  }
});
