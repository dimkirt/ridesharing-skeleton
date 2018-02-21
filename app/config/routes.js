import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Profile from '../screens/Profile';

export const HomeStack = StackNavigator({
    Home:{
        screen: Home,
        navigationOptions:{
            headerTitle: 'Home',
        }
    },
    Profile:{
        screen: Profile,
        navigationOptions:{
            headerTitle: 'Profile',
        }
    }
});

export const Tabs = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
        }
    }
});