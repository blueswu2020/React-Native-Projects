import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();
import {Text, View} from 'react-native';
import FeedbackRespondList from '../view/main/feedback/FeedbackRespondList';
import FeedbackRespondDetail from '../view/main/feedback/FeedbackRespondDetail';

function FeedbackRespondStackNavigator() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="FeedbackRespondList"
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
                name="FeedbackRespondList"
                component={FeedbackRespondList}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="FeedbackRespondDetail"
                component={FeedbackRespondDetail}
                options={{title:'反馈详情'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default FeedbackRespondStackNavigator;
