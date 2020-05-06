import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EmploymentEnroll from '../view/main/community/EmploymentEnroll';
import EmploymentEnrollDetail from '../view/main/community/EmploymentEnrollDetail';

const Stack = createStackNavigator();

function EmploymentEnrollRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="EmploymentEnrollList"
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
                name="EmploymentEnrollList"
                component={EmploymentEnroll}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="EmploymentEnrollDetail"
                component={EmploymentEnrollDetail}
                options={{title: '活动详情'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default EmploymentEnrollRootStack;
