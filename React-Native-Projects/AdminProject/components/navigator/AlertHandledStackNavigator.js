import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AlertHandled from '../view/main/alert/AlertHandled';
import AlertHandledDetail from '../view/main/alert/AlertHandledDetail';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

function AlertHandledRootStack() {
    return (
        //<NavigationContainer>
            <Stack.Navigator
                initialRouteName="AlertHandledList"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'gray',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="AlertHandledList"
                    component={AlertHandled}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AlertHandledDetail"
                    component={AlertHandledDetail}
                    options={{title:'详情'}}
                />
            </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default AlertHandledRootStack;
