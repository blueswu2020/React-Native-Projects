import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from './AlertTopTabs'; //引入上导航栏

const Stack = createStackNavigator();

function AlertRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="AlertTopTabs"
        >
            <Stack.Screen
                name="AlertTopTabs"
                component={MyTabs}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default AlertRootStack;
