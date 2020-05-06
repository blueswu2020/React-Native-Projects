import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();
import {Text, View} from 'react-native';
import Feedback from '../view/main/feedback/Feedback';

function FeedbackStack() {
    return (
        //<NavigationContainer>
            <Stack.Navigator
                initialRouteName="Feedback"
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
                    name="Feedback"
                    component={Feedback}
                    options={{headerShown: false}}
                />

            </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default FeedbackStack;
