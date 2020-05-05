import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import EmploymentList from '../view/main/community/EmploymentList';
import EmploymentDetail from '../view/main/community/EmploymentDetail';
import EmploymentAdd from '../view/main/community/EmploymentAdd'
import EmploymentEdit from '../view/main/community/EmploymentEdit'
import EmploymentEnrolledUserList from '../view/main/community/EmploymentEnrolledUserList'

const Stack = createStackNavigator();

function EmploymentRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="EmploymentList"
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'gray',
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
            <Stack.Screen
                name="EmploymentAdd"
                component={EmploymentAdd}
                options={{title: '添加活动'}}
            />
            <Stack.Screen
                name="EmploymentEdit"
                component={EmploymentEdit}
                options={{title: '修改活动'}}
            />
            <Stack.Screen
                name="EmploymentEnrolledUserList"
                component={EmploymentEnrolledUserList}
                options={{title: '参与本活动的用户列表'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default EmploymentRootStack;
