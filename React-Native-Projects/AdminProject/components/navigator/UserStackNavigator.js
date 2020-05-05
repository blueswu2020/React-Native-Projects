import React,{Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Text, TouchableOpacity, StyleSheet,ToastAndroid} from 'react-native';
import UserList from '../view/main/user/UserList'
import UserDetail from '../view/main/user/UserDetail'
import UserAdd from '../view/main/user/UserAdd'
import UserEdit from '../view/main/user/UserEdit'
import storage from '../model/storage'

const Stack = createStackNavigator();

export default class UserRootStack extends Component{
    constructor(props) {
        super(props);
    }

    _loginOut = () => {
        //删除数据
        storage.remove({
            key: 'user',
            id: '1'
        });
        this.props.navigation.navigate('Login')
        ToastAndroid.show("登出",ToastAndroid.SHORT)
    }

    render() {
        return (
            //<NavigationContainer>
            <Stack.Navigator
                initialRouteName="UserList"
                screenOptions={{
                    headerStyle: {
                        // backgroundColor: '#91d6ff',
                        backgroundColor: 'gray',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}

            >
                <Stack.Screen
                    name="UserList"
                    component={UserList}
                    options={{
                        headerTitle:"用户一览",
                        headerRight: () => (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this._loginOut}
                            >
                                <Text style={styles.buttonText}>登出</Text>
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen
                    name="UserDetail"
                    component={UserDetail}
                    options={{title:"用户信息"}}
                />
                <Stack.Screen
                    name="UserEdit"
                    component={UserEdit}
                    options={{title:"编辑信息"}}
                />
                <Stack.Screen
                    name="UserAdd"
                    component={UserAdd}
                    options={{title:"新增用户"}}
                />
            </Stack.Navigator>
            //</NavigationContainer>

        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin:10,
        // backgroundColor: 'red',
        // justifyContent:'center',
        // alignItems:'center',
        // height:40,
        // width:40,
        // borderRadius:20
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'blue'
    },
})
