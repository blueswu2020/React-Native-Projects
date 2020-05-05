import React,{Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { Text, View} from 'react-native';

import AccountLogin from '../view/login/Login';
import Register from '../view/login/Register';
import UserRegister from '../view/login/UserRegister';
import MainTabNavigator from './MainTabNavigator'

const LoginStack = createStackNavigator();

function LoginScreen() {
    return (
        <NavigationContainer>
            <LoginStack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'gray',
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
                    options={{title:'管理员登录'}}
                />
                <LoginStack.Screen
                    name="Register"
                    component={Register}
                    options={{title:'管理员注册'}}
                />
                <LoginStack.Screen
                    name="UserRegister"
                    component={UserRegister}
                    options={{title:'用户注册'}}
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
