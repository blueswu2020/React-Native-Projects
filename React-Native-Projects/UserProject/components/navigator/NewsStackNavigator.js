import React,{Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NewsList from '../view/main/news/NewsList'
import NewsDetail from '../view/main/news/NewsDetail';
import {TouchableOpacity, Text, StyleSheet,Alert,Button,ToastAndroid} from 'react-native';
import storage from '../model/storage';

const Stack = createStackNavigator();

export default class NewsRootStack extends Component{

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
        ToastAndroid.show("重新登录",ToastAndroid.SHORT)
    }

    render() {
        return (
            //<NavigationContainer>
            <Stack.Navigator
                initialRouteName="NewsList"
            >
                <Stack.Screen
                    name="NewsList"
                    component={NewsList}
                    options={{
                        headerTitle:"网易新闻",
                        headerRight: () => (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this._loginOut}
                            >
                                <Text style={styles.buttonText}>登出</Text>
                            </TouchableOpacity>
                        ),
                        headerStyle: {
                            backgroundColor: '#91d6ff',
                        },
                        headerTintColor: '#000000',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}

                />
                <Stack.Screen
                    name="NewsDetail"
                    component={NewsDetail}
                    options={{
                        title: '404',
                        headerStyle: {
                            backgroundColor: '#91d6ff',
                        },
                        headerTintColor: '#000000',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
            //</NavigationContainer>
        );
    }
}

//底部标签渲染函数
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    button: {
        margin:10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FF6209'
    },
});



