import React, {Component} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    Alert,
    Dimensions,
    AsyncStorage,
    ToastAndroid,
} from 'react-native';
import storage from '../../model/storage';

//获取屏宽
const DevWidth = Dimensions.get('window').width;
export default  class LoginScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            accountJson: [], //账号密码信息
            account: null,
            password: null,
            disTouchable: true, //默认按钮不可用
        };
    }

    //判断用户是否登录过了，如果登录过就直接登录
    UNSAFE_componentWillMount() {
        storage.load({
            key: 'user',
            id: '1'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回,说明已经登录过了，直接跳转到主界面
            this.setState({
                account: ret,
            })
            this.turnToMain();
        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }

    //获取用户的账号信息
    onGetUser = () => {
        fetch('http://192.168.1.3:3000/login/'+ this.state.account,{
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            this.setState({
                accountJson: jsonData,
            })
            console.log(this.state.accountJson);
            if(this.state.accountJson.length !== 0){
                if(this.state.password === this.state.accountJson[0].password){
                    //保存数据
                    storage.save({
                        key: 'user',  // 注意:请不要在key中使用_下划线符号!
                        id: '1',   // 注意:请不要在id中使用_下划线符号!
                        data: this.state.account,
                        expires: 1000 * 3600 * 24 * 360, //设置过期时间为一年
                    });
                    ToastAndroid.show("登录成功", ToastAndroid.SHORT);
                    this.turnToMain();
                }else{
                    ToastAndroid.show("账号或密码错误", ToastAndroid.SHORT);
                }
            }else{
                ToastAndroid.show("账号或密码错误", ToastAndroid.SHORT);
            }
        })
            .catch((error) => {
                console.warn(error);
            }).done();
    }

    //转到主界面
    turnToMain = () => {
        this.props.navigation.navigate('Tab',{
            screen: 'NewsRoot',
            params: {
                screen: 'NewsList',   //跳转到主页
            },
        });
    }

    //处理登录按钮
    onHandleLogin = () => {
        this.onGetUser();
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    placeholder="请输入手机号"
                    style={styles.textInput}
                    keyboardType="numeric"
                    maxLength={20}
                    value={this.state.account}
                    onChangeText={(text) =>{this.setState({account: text})}}
                />
                <TextInput
                    placeholder="请输入登录密码"
                    secureTextEntry={true}
                    style={styles.textInput}
                    maxLength={20}
                    value={this.state.password}
                    onChangeText={(text) =>{this.setState({password: text})}}
                />
                {this.state.account && this.state.password ? this.state.disTouchable = false : this.state.disTouchable = true}

                <TouchableOpacity
                    style={styles.button}
                    disabled={this.state.disTouchable}
                    onPress={this.onHandleLogin}
                >
                    <Text style={styles.buttonText}>登录</Text>
                </TouchableOpacity>
                <Text style={styles.text}>忘记密码请联系社区管理员</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    button:{
        height:40,
        width:DevWidth*0.6,
        borderRadius:20,
        backgroundColor: '#91d6ff',
        justifyContent:'center',
        margin:10,
    },
    buttonText: {
        textAlign:'center',
        color:'black',
    },
    textInput: {
        width:DevWidth*0.6,
        height: 40,
        borderWidth: 1,
        margin: 20,
        paddingLeft: 10,
    },
    text: {
        marginTop:20,
        fontSize:20,
        color: 'gray',
    }
})
