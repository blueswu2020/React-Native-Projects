import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedbackStackNavigator from '../navigator/FeedbackStackNavigator';
import FeedbackRespondStackNavigator from '../navigator/FeedbackRespondStackNavigator';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

function FeedbackTabs() {
    return (
        <Tab.Navigator
            initialRouteName="FeedbackStackNavigator "
            tabBarOptions={{
                activeTintColor: '#000000',
                labelStyle: { fontSize: 20 },
                style: { backgroundColor: '#91d6ff' },
            }}
        >
            <Tab.Screen
                name="FeedbackStackNavigator"
                component={FeedbackStackNavigator}
                options={{title: '反馈'}}
            />
            <Tab.Screen
                name="FeedbackRespondStackNavigator"
                component={FeedbackRespondStackNavigator}
                options={{title: '回复'}}
            />
        </Tab.Navigator>
    );
}

export default FeedbackTabs;
