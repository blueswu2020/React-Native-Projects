import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EmploymentList from '../view/main/community/EmploymentList';
import EmploymentDetail from '../view/main/community/EmploymentDetail';

const Stack = createStackNavigator();

function EmploymentRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="EmploymentList"
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
                name="EmploymentList"
                component={EmploymentList}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="EmploymentDetail"
                component={EmploymentDetail}
                options={{title: '活动详情'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default EmploymentRootStack;
