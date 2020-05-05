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

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>账号</Text>
                    <TextInput
                        placeholder="手机号"
                        style={styles.textInput}
                        keyboardType="numeric"
                        maxLength={20}
                        value={this.state.account}
                        onChangeText={(text) =>{this.setState({account: text})}}
                    />
                </View>
                <View style={styles.divideLine} ></View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>密码</Text>
                    <TextInput
                        placeholder="密码"
                        secureTextEntry={true}
                        style={styles.textInput}
                        maxLength={20}
                        value={this.state.password}
                        onChangeText={(text) =>{this.setState({password: text})}}
                    />
                </View>
                {this.state.account && this.state.password ? this.state.disTouchable = false : this.state.disTouchable = true}

                <TouchableOpacity
                    style={styles.button}
                    disabled={this.state.disTouchable}
                    onPress={this.onHandleLogin}
                >
                    <Text style={styles.buttonText}>登录</Text>
                </TouchableOpacity>
                <View style={{alignItems:'flex-end',width:DevWidth,marginRight:30}}>
                    <TouchableOpacity
                        onPress={this.onHandleRegister}
                    >
                        <Text style={{color:'blue',fontSize:13}}>新用户注册</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    //获取管理员的账号信息
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
                    // Alert.alert("提示：","登录成功")
                    this.turnToMain();
                }else{
                    Alert.alert("提示：","账号或密码错误")
                    return;
                }
            }else{
                Alert.alert("提示：","账号或密码错误")
                return;
            }
        })
            .catch((error) => {
                console.warn(error);
            }).done();
    }

    //转到主界面
    turnToMain = () => {
        this.props.navigation.navigate('Tab',{
            screen: 'UserRoot',
            params: {
                screen: 'UserList',   //将账号信息传给用户列表
                params:{
                    adminPhone: this.state.account,
                },
            },
        });
    }

    //处理登录按钮
    onHandleLogin = () => {
        this.onGetUser();
    }

    //处理先注册按钮
    onHandleRegister = () => {
        this.props.navigation.navigate('Register')
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor: '#F5FCFF',
        marginTop:20,
    },
    inputContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#FFF',
        width:DevWidth,
    },
    text:{
        fontSize:18,
        justifyContent:'center',
    },
    textInput: {
        width:DevWidth*0.8,
        paddingLeft: 20,
        fontSize: 18,
    },
    divideLine:{
        height: 1,
        backgroundColor: '#e8e8e8',
        marginLeft: 10,
    },
    button:{
        height:40,
        width:DevWidth*0.95,
        borderRadius:10,
        backgroundColor: '#c2e3ff',
        justifyContent:'center',
        margin:10,
    },
    buttonText: {
        textAlign:'center',
        color:'black',
        fontSize:18
    },

})

