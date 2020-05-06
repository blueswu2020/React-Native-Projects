import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActivityRootStack from '../navigator/ActivityStackNavigator';
import ActivityEnrollRootStack from '../navigator/ActivityEnrollStackNavigator';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

function ActivityTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Activity"
            tabBarOptions={{
                activeTintColor: '#000000',
                labelStyle: { fontSize: 20 },
                style: { backgroundColor: '#91d6ff' },
            }}
        >
            <Tab.Screen
                name="Activity"
                component={ActivityRootStack}
                options={{title:"活动一览"}}
            />
            <Tab.Screen
                name="ActivityEnroll"
                component={ActivityEnrollRootStack}
                options={{title:"已报名活动"}}
            />
        </Tab.Navigator>
    );
}

export default ActivityTabs;
