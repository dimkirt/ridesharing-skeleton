import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';
import UserLocation from '../components/UserLocation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    main: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.headerText,
        fontWeight: '400',
        fontStyle: 'bold',
    },
});

const Profile = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.main}>
                User Location
            </Text>
            <UserLocation />
            <Button
                text="Home"
                onPress={() => props.navigation.navigate('Home')}
            />
        </View>
    );
};

export default Profile;