import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EducationEnroll from '../view/main/community/EducationEnroll';
import EducationEnrollDetail from '../view/main/community/EducationEnrollDetail';

const Stack = createStackNavigator();

function EducationEnrollRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="EducationEnrollList"
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
                name="EducationEnrollList"
                component={EducationEnroll}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="EducationEnrollDetail"
                component={EducationEnrollDetail}
                options={{title: '活动详情'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default EducationEnrollRootStack;
