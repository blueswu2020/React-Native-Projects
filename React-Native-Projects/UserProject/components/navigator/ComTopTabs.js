import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActivityTabs from '../navigator/ActTopTabs';
import EducationTabs from '../navigator/EduTopTabs';
import EmploymentTabs from '../navigator/EmpTopTabs';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="ActivityTabs "
            tabBarOptions={{
                activeTintColor: '#000000',
                labelStyle: { fontSize: 20 },
                style: { backgroundColor: '#91d6ff' },
            }}
        >
            <Tab.Screen
                name="ActivityTabs"
                component={ActivityTabs}
                options={{title:"社区活动"}}
            />
            <Tab.Screen
                name="EducationTabs"
                component={EducationTabs}
                options={{title:"社区教育"}}
            />
            <Tab.Screen
                name="EmploymentTabs"
                component={EmploymentTabs}
                options={{title:"社区就业"}}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;
