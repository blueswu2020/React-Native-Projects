import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ComTopTabs from './ComTopTabs';

const Stack = createStackNavigator();

function CommunityRootStack() {
    return (
        //<NavigationContainer>
            <Stack.Navigator
                initialRouteName="Community"
            >
                <Stack.Screen
                    name="Community"
                    component={ComTopTabs}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default CommunityRootStack;
