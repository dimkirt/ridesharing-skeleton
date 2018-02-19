
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Dimensions
} from 'react-native';

import pinImage from './assets/custompin.png';

// import firebase
import firebase from 'react-native-firebase';

// import react-native maps
import MapView, {Marker, Polyline} from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default class GeoLocationExample extends Component{

  constructor(props){
    super(props);

    // Add firebase things to state too
    this.state = {
      region: {
        latitude: 48.1769318,
        longitude: 11.5940593,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      latitude: null,
      longitude: null,
      error: null,
      notif: null,
      route2: [
        {
          key: 11,
          title: "Point A",
          coordinates:{
            latitude: 48.175133,
            longitude:  11.593923
          },
          description: "Start of the Test Route 2"
        },
        {
          key: 22,
          title: "Point B",
          coordinates:{
            latitude: 48.174460,
            longitude: 11.595318
          },
          description: "Mid of the Test Route 2"
        },
        {
          key: 33,
          title: "Point C",
          coordinates:{
            latitude: 48.172986,
            longitude: 11.598118
          },
          description: "End of the Test Route"
        }
      ],
      route1: [
        {
          key: 1,
          title: "Alte Heide",
          coordinates:{
            latitude: 48.177730,
            longitude: 11.602100
          },
          description: "Start of the Test Route"
        },
        {
          key: 2,
          title: "Nordfriedhof",
          coordinates:{
            latitude: 48.173058,
            longitude: 11.596876
          },
          description: "2nd point of the Test Route"
        },
        {
          key: 3,
          title: "Mid",
          coordinates:{
            latitude: 48.170099,
            longitude: 11.594032
          },
          description: "3rd point of the Test Route"
        },
        {
          key: 4,
          title: "Potsdamer Strasse",
          coordinates:{
            latitude: 48.1666106,
            longitude: 11.5903105
          },
          description: "4th point of the Test Route"
        },
        {
          key: 5,
          title: "Germania Munich",
          coordinates:{
            latitude: 48.167256,
            longitude: 11.5883395  
          },
          description: "End of the Test Route"
        }
      ]      
    };

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  _setupFirebase(){
    // Firebase app
    
    // Receives the app as an argument, if we don't provide an app the
    // default app is used (which one is the default?)
    const FCM = firebase.messaging();

    // Topic doesn't work with Notifications creator for some reason
    FCM.subscribeToTopic('/topics/hello');

    FCM.onMessage(message => {
      //console.error('Caught by onMessage: ' + JSON.stringify(message));
      this.setState({
        error: null,
        notif: 'From onMessage: ' + message.msg
      });
    });
    
    // This is triggered when the application has opened from a notification
    FCM.getInitialNotification()
      .then(res => {
        // res object
        //console.error('Caught by initNotif: ' + JSON.stringify(res));
        this.setState({
          error: null,
          notif: 'From initNotif: ' + res.msg
        });
    });
  }

  componentDidMount(){
    // Add Firebase things here?
    this._requestPermission();
    this._setupFirebase();
  }

  /*
    Android API >= 23 Requires an additional step to check for, and request the
    ACCESS_FINE_LOCATION permission using the PermissionsAndroid API. Failure to
    do so may result in a hard crash.
    targetSdkVersion and compiledSdkVersion must be over >= 23 in order for the
    dialog prompt to come up
  */
  _requestPermission(){
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
      {
        'title': 'Smartwheels App Location Permission',
        'message': 'Smartwheels App needs access to your GPS'
      })
      .then(result => {
        if (result === PermissionsAndroid.RESULTS.GRANTED){
          // Location Permission granted
          navigator.geolocation.getCurrentPosition(
            position => {
              // success cb
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            error => {
              // error cb
              this.setState({error: error.message});
            },
            {
              // settings object
              // Others except timeout seem to create a bug
              // https://github.com/facebook/react-native/issues/12996
              //enableHighAccuracy: true,
              timeout: 20000,
              //maximumAge: 1000
            }
          );
        }
        else{
          // Location Permission NOT granted
          this.setState({error: 'Permission Denied!'});
        }
    })
  }

  onRegionChange(event){
    //this.setState({region: event});
  }

  render(){
    const markerElems = this.state.route1.map(marker => (
      <Marker
        key={marker.key}
        coordinate={marker.coordinates}
        title={marker.title}
        description={marker.description}
      />
    ));

    const markerElems2 = this.state.route2.map(marker => (
      <Marker 
        key={marker.key}
        coordinate={marker.coordinates}
        title={marker.title}
        description={marker.description}
        image={pinImage}
      />
    ));

    const routeLine1 = this.state.route1.map(marker => marker.coordinates);
    const routeLine2 = this.state.route2.map(marker => marker.coordinates);

    return (
      <View style={styles.container}>
        <MapView style={styles.map} 
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          {markerElems}
          {markerElems2}

          <Polyline
            key={1}
            coordinates={routeLine1}
            strokeColor="#F00"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={1}
          />

          <Polyline
            key={2}
            coordinates={routeLine2}
            strokeColor="#0F0"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={3}
          />
        </MapView>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>Notif: {this.state.notif}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
      
    );
  }
}
