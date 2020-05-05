import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AlertScreen from '../view/main/alert/AlertList';
import AlertDetail from '../view/main/alert/AlertDetail';
import AlertRecord from '../view/main/alert/AlertRecord';

const Stack = createStackNavigator();

function AlertHandlingRootStack() {
    return (
        //<NavigationContainer>
            <Stack.Navigator
                initialRouteName="AlertList"
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
                    name="AlertList"
                    component={AlertScreen}
                    options={{title:'求救列表'}}
                />
                <Stack.Screen
                    name="AlertDetail"
                    component={AlertDetail}
                    options={{title:'求救人员详细情报'}}
                />
                <Stack.Screen
                    name="AlertRecord"
                    component={AlertRecord}
                    options={{title:'求救信息记录'}}
                />
            </Stack.Navigator>
        //</NavigationContainer>

    );
}

export default AlertHandlingRootStack;
