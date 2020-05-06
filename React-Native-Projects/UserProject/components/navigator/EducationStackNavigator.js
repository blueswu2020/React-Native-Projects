import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EducationList from '../view/main/community/EducationList';
import EducationDetail from '../view/main/community/EducationDetail';

const Stack = createStackNavigator();

function EducationRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="EducationList"
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
                name="EducationList"
                component={EducationList}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="EducationDetail"
                component={EducationDetail}
                options={{title: '活动详情'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default EducationRootStack;
