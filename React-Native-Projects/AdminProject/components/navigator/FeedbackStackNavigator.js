import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedbackDetail from '../view/main/feedback/FeedbackDetail';
import FeedbackList from '../view/main/feedback/FeedbackList';
import FeedbackRespond from '../view/main/feedback/FeedbackRespond';

const Stack = createStackNavigator();

function FeedbackRootStack() {
    return (
        //<NavigationContainer>
        <Stack.Navigator
            initialRouteName="FeedbackList"
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
                name="FeedbackList"
                component={FeedbackList}
                options={{title:"反馈列表"}}
            />
            <Stack.Screen
                name="FeedbackDetail"
                component={FeedbackDetail}
                options={{title:"用户反馈详情"}}
            />
            <Stack.Screen
                name="FeedbackRespond"
                component={FeedbackRespond}
                options={{title:"回复反馈"}}
            />
        </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default FeedbackRootStack;
