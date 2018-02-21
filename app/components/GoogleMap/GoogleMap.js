import React, { Component } from 'react';
import { Dimensions } from 'react-native';
// import react-native maps
import MapView, {Marker, Polyline} from 'react-native-maps';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class GoogleMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            region: {
                latitude: 48.1769318,
                longitude: 11.5940593,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            routes: [
                [
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
                ],
                [
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
                ]
            ],
            markers: [
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
    }

    render(){
        const routeLines = this.state.routes.map((route, index) => {
            // for each route create a polyline
            const pointList = route.map(point => point.coordinates);
            return <Polyline
                key={index}
                coordinates={pointList}
                strokeColor="#F00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
            />
        });
    
        const markerPins = this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
            />
        ));

        return (
            <MapView 
                style={styles.map} 
                region={this.state.region}
                onRegionChange={this.onRegionChange}
            >
                {routeLines}
                {markerPins}
            </MapView>
        );
    }
}

export default GoogleMap;