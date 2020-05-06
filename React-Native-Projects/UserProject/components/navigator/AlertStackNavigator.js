import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlertScreen from '../view/main/alert/Alert';
import AlertSend from '../view/main/alert/AlertSend'
const Stack = createStackNavigator();

function AlertRootStack() {
    return (
        //<NavigationContainer>
            <Stack.Navigator
                initialRouteName="Alert"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#91d6ff',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="Alert"
                    component={AlertScreen}
                    options={{title:'急救'}}
                />
                <Stack.Screen
                    name="AlertSend"
                    component={AlertSend}
                    options={{title:'急救'}}
                />
            </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default AlertRootStack;
