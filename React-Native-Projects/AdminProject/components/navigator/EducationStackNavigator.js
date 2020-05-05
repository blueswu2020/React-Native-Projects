import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import EducationList from '../view/main/community/EducationList';
import EducationDetail from '../view/main/community/EducationDetail';
import EducationAdd from '../view/main/community/EducationAdd'
import EducationEdit from '../view/main/community/EducationEdit'
import EducationEnrolledUserList from '../view/main/community/EducationEnrolledUserList';

const Stack = createStackNavigator();

function EducationRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="EducationList"
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
                name="EducationList"
                component={EducationList}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="EducationDetail"
                component={EducationDetail}
                options={{title: '活动详情'}}
            />
            <Stack.Screen
                name="EducationAdd"
                component={EducationAdd}
                options={{title: '添加活动'}}
            />
            <Stack.Screen
                name="EducationEdit"
                component={EducationEdit}
                options={{title: '修改活动'}}
            />
            <Stack.Screen
                name="EducationEnrolledUserList"
                component={EducationEnrolledUserList}
                options={{title: '参与本活动的用户列表'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default EducationRootStack;
