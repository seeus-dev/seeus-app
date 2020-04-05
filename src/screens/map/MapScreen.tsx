import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import baseStyle from '../../styles/base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const EMU_CAMPUS_MAP_START_REGION = {
  latitude: 42.25117744909886,
  longitude: -83.62443594262004,
  latitudeDelta: 0.012188015995853618,
  longitudeDelta: 0.00833127647638321,
};

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        region={EMU_CAMPUS_MAP_START_REGION}
        showsUserLocation
        // onUserLocationChange={(e) => console.log('location', e)}
        onRegionChange={(region) => console.log(region)}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        showsTraffic={false}
        mapType="standard"
        customMapStyle={[
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            stylers: [{ visibility: 'off' }],
          },
        ]}
      />
      <View style={styles.mapDrawerOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...baseStyle.container,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 0,
  },
  mapView: {
    flex: 1,
    width: '100%',
    zIndex: 1,
  },
  mapDrawerOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.0,
    height: Dimensions.get('window').height,
    width: 40,
    zIndex: 2,
  },
});
