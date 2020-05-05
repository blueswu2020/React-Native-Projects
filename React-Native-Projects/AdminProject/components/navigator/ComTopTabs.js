import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActivityRootStack from '../navigator/ActivityStackNavigator';
import EducationRootStack from '../navigator/EducationStackNavigator';
import EmploymentRootStack from '../navigator/EmploymentStackNavigator';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Activity"
            tabBarOptions={{
                activeTintColor: '#000000',
                labelStyle: { fontSize: 20 },
                style: { backgroundColor: 'gray' },
            }}
        >
            <Tab.Screen
                name="Activity"
                component={ActivityRootStack}
                options={{title:"社区活动"}}
            />
            <Tab.Screen
                name="Education"
                component={EducationRootStack}
                options={{title:"社区教育"}}
            />
            <Tab.Screen
                name="Employment"
                component={EmploymentRootStack}
                options={{title:"社区就业"}}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;
