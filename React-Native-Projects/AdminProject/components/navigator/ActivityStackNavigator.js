import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ActivityList from '../view/main/community/ActivityList';
import ActivityDetail from '../view/main/community/ActivityDetail';
import ActivityAdd from '../view/main/community/ActivityAdd'
import ActivityEdit from '../view/main/community/ActivityEdit'
import ActivityEnrolledUserList from '../view/main/community/ActivityEnrolledUserList';

const Stack = createStackNavigator();

function ActivityRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="ActivityList"
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
                name="ActivityList"
                component={ActivityList}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ActivityDetail"
                component={ActivityDetail}
                options={{title: '活动详情'}}
            />
            <Stack.Screen
                name="ActivityAdd"
                component={ActivityAdd}
                options={{title: '添加活动'}}
            />
            <Stack.Screen
                name="ActivityEdit"
                component={ActivityEdit}
                options={{title: '修改活动'}}
            />
            <Stack.Screen
                name="ActivityEnrolledUserList"
                component={ActivityEnrolledUserList}
                options={{title: '参与本活动的用户列表'}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default ActivityRootStack;
