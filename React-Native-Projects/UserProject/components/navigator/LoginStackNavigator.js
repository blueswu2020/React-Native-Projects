import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import AccountLogin from '../view/login/Login';
import MainTabNavigator from './MainTabNavigator'

const LoginStack = createStackNavigator();

function LoginScreen() {
    return (
        <NavigationContainer>
            <LoginStack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#91d6ff',
                    },
                    activeTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <LoginStack.Screen
                    name="Login"
                    component={AccountLogin}
                    options={{title:'用户登录'}}
                />
                <LoginStack.Screen
                    name="Tab"
                    component={MainTabNavigator}
                    options={{headerShown: false}}
                />
            </LoginStack.Navigator>
        </NavigationContainer>
    );
}

export default LoginScreen;
