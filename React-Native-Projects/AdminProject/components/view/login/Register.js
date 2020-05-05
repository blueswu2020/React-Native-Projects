import React, {Component} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    Alert, Dimensions, ToastAndroid,
} from 'react-native';

//获取屏宽
const DevWidth = Dimensions.get('window').width;
export default  class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            getUserAccount:[],
            postUserAccount:[],
            disTouchable: true,
            rightPhoneNumber: false,
            account:null,
            password:null,
            passwordConfirm:null,
            adminPhone:null,
        }
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
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>密码</Text>
                    <TextInput
                        placeholder="再次输入"
                        secureTextEntry={true}
                        style={styles.textInput}
                        maxLength={20}
                        value={this.state.passwordConfirm}
                        onChangeText={(text) =>{this.setState({passwordConfirm: text})}}
                    />
                </View>
                {this.state.password && this.state.account && this.state.passwordConfirm ?
                    this.state.disTouchable = false
                    :
                    this.state.disTouchable = true
                }
                <TouchableOpacity
                    style={styles.button}
                    disabled={this.state.disTouchable}
                    onPress={this.onCustomerHandler}
                >
                    <Text style={styles.buttonText}>下一步</Text>
                </TouchableOpacity>

            </View>
        );
    }

    onGetUser = () => {
        fetch('http://192.168.1.3:3000/login/'+ this.state.account,{
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            this.setState({
                getUserAccount: jsonData,
            })
            console.log(this.state.getUserAccount);
        })
            .catch((error) => {
                console.warn(error);
            }).done();
    }


    onPostUser = () => {
        if(this.state.password === this.state.passwordConfirm){ //验证两次输入的密码是否一致
            fetch('http:192.168.1.3:3000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({account: this.state.account, password: this.state.password})
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.setState({
                    postUserAccount:jsonData,
                })
                console.log(this.state.postUserAccount)
                ToastAndroid.show("注册成功",ToastAndroid.SHORT);
                this.props.navigation.navigate('Tab');
            })
                .catch((error) => {
                    console.warn(error);
                }).done();
        }else{
            Alert.alert("提示：","两次输入的密码不一致")
            return;
        }

    }

    onCustomerHandler = () => {
        this.onGetUser();
        if(0 !== this.state.getUserAccount.length){
            Alert.alert("提示","该账号已存在")
        }else{
            this.onPostUser();
        }
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

