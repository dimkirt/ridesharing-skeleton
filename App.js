
import React, { Component } from 'react';
import {
  Text,
  View,
  PermissionsAndroid
} from 'react-native';

export default class GeoLocationExample extends Component{

  constructor(props){
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount(){
    this._requestPermission();
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

  render(){
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}
