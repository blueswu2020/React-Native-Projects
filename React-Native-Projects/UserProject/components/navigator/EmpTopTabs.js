import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EmploymentRootStack from '../navigator/EmploymentStackNavigator';
import EmploymentEnrollRootStack from '../navigator/EmploymentEnrollStackNavigator';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

function EmploymentTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Employment"
            tabBarOptions={{
                activeTintColor: '#000000',
                labelStyle: { fontSize: 20 },
                style: { backgroundColor: '#91d6ff' },
            }}
        >
            <Tab.Screen
                name="Employment"
                component={EmploymentRootStack}
                options={{title:"活动一览"}}
            />
            <Tab.Screen
                name="EmploymentEnroll"
                component={EmploymentEnrollRootStack}
                options={{title:"已报名活动"}}
            />
        </Tab.Navigator>
    );
}

export default EmploymentTabs;
