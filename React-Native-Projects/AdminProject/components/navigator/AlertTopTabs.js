import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AlertHandlingRootStack from '../navigator/AlertHandlingStackNavigator';
import AlertHandledRootStack from '../navigator/AlertHandledStackNavigator'
import React from 'react';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="AlertHandling"
            tabBarOptions={{
                activeTintColor: '#000000',
                labelStyle: { fontSize: 20 },
                style: { backgroundColor: 'gray' },
            }}
        >
            <Tab.Screen
                name="AlertHandling"
                component={AlertHandlingRootStack}
                options={{title:"待处理"}}
            />
            <Tab.Screen
                name="AlertHandled"
                component={AlertHandledRootStack}
                options={{title:"已处理"}}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;
