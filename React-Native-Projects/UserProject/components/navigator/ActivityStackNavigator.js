import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityList from '../view/main/community/ActivityList';
import ActivityDetail from '../view/main/community/ActivityDetail';

const Stack = createStackNavigator();

function ActivityRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="ActivityList"
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
                name="ActivityList"
                component={ActivityList}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ActivityDetail"
                component={ActivityDetail}
                options={{title: '活动详情'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default ActivityRootStack;
