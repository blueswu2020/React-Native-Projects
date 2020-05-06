import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedbackTabs from './FeeTopTabs';

const Stack = createStackNavigator();

function FeedbackRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="FeedbackTabs"
        >
            <Stack.Screen
                name="FeedbackTabs"
                component={FeedbackTabs}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default FeedbackRootStack;
