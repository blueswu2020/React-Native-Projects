import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EducationRootStack from '../navigator/EducationStackNavigator';
import EducationEnrollRootStack from '../navigator/EducationEnrollStackNavigator';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

function EducationTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Education"
            tabBarOptions={{
                activeTintColor: '#000000',
                labelStyle: { fontSize: 20 },
                style: { backgroundColor: '#91d6ff' },
            }}
        >
            <Tab.Screen
                name="Education"
                component={EducationRootStack}
                options={{title:"活动一览"}}
            />
            <Tab.Screen
                name="EducationEnroll"
                component={EducationEnrollRootStack}
                options={{title:"已报名活动"}}
            />
        </Tab.Navigator>
    );
}

export default EducationTabs;
