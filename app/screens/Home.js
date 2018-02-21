import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

import { colors } from '../config/styles';
import Button from '../components/Button';
// when requiring a directory, it's index.js file will be used
import GoogleMap from '../components/GoogleMap'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: colors.background,
    },
    main: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.headerText,
        fontWeight: '400',
        fontStyle: 'italic',
    },
});

const Home = (props) => {
    return(
        <View style={styles.container}>
            <GoogleMap />
            <Button
                text="Profile"
                onPress={() => props.navigation.navigate('Profile')}
            />
        </View>
    );
};

export default Home;