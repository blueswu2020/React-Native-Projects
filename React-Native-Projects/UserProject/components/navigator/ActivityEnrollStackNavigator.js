import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityEnroll from '../view/main/community/ActivityEnroll';
import ActivityEnrollDetail from '../view/main/community/ActivityEnrollDetail';

const Stack = createStackNavigator();

function ActivityEnrollRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="ActivityEnrollList"
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
                name="ActivityEnrollList"
                component={ActivityEnroll}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ActivityEnrollDetail"
                component={ActivityEnrollDetail}
                options={{title: '活动详情'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default ActivityEnrollRootStack;
