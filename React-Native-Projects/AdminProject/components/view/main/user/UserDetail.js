import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Alert,
    ScrollView, RefreshControl,
} from 'react-native';

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            phone: null,
            refreshing: false,
            password: null,
        };
    }

    //获取用户手机号
    UNSAFE_componentWillMount() {
        const {userPhone} = this.props.route.params;
        this.setState({
            phone: userPhone,
        })
    }

    //获取用户信息
    onGetUser = () => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.1.3:3000/user/' + this.state.phone, {  //根据用户手机号获取用户信息
                method: 'GET'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.setState({
                    userInfo: jsonData[0],
                })
                resolve(jsonData)
            })
                .catch((error) => {
                    console.warn(error);
                    reject(error)
                }).done();
        })
    }

    onGetPassword = () => {
        fetch('http://192.168.1.3:3000/login/' + this.state.phone, {  //根据用户手机号获取用户信息
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            this.setState({
                password: jsonData[0].password,
            })
        })
            .catch((error) => {
                console.warn(error);
            }).done();
    }

    //处理删除用户按钮
    onHandlerDeleteUser = () => {
        this.alertHandler();
    }

    //弹出确认框
    alertHandler = () => {
        Alert.alert('提示','确认删除用户吗？',
            [
                {text:"确认", onPress:this.onDoDeleteUser},
                {text:"取消"},
            ]
        );
    }

    //删除用户跳转界面
    onDoDeleteUser = () => {
        this.onDeleteAccount();
        this.onDeleteUser();
        this.turnToUserList();
    }

    //删除用户账号
    onDeleteAccount = () => {
        fetch('http://192.168.1.3:3000/login/' + this.state.phone, {  //根据用户手机号删除用户账号信息
            method: 'DELETE'
        }).then((response) => {
            console.log(response.rows);
        }).catch((error) => {
                console.warn(error);
            }).done();
    }

    //删除用户信息
    onDeleteUser = () => {
        fetch('http://192.168.1.3:3000/user/' + this.state.phone, {  //根据用户手机号删除用户信息
            method: 'DELETE'
        }).then((response) => {
            console.log(response.rows);
        }).catch((error) => {
                console.warn(error);
            }).done();
    }

    //跳转到用户列表
    turnToUserList = () => {
        this.props.navigation.navigate('Tab',{
            screen: 'UserRoot',
            params: {
                screen: 'UserList',
                params:{adminPhone: this.state.userInfo.adminPhone},
            },
        });
    }

    //处理编辑信息按钮
    onHandlerEditUser = () => {
        this.turnToUserEdit();
    }

    //跳转到编辑信息界面
    turnToUserEdit = () => {
        this.props.navigation.navigate('UserEdit',{
            userInfo: this.state.userInfo,
        })
    }


    render() {
        if(0 === this.state.userInfo.length){
            this.onGetUser();
            this.onGetPassword();
        }
        return (
            <ScrollView
                refreshControl={                                  //下拉刷新组件
                    <RefreshControl
                        refreshing={this.state.refreshing}            //通过state.refreshing控制是否刷新
                        onRefresh={this._onRefresh.bind(this)}        //执行刷新函数
                    />
                }
            >
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>账号：{this.state.userInfo.phone}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>密码：{this.state.userInfo.phone}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>姓名：{this.state.userInfo.name}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>性别：{this.state.userInfo.gender}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>出生年份：{this.state.userInfo.birthday}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>住址：{this.state.userInfo.address}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>病史：{this.state.userInfo.caseHistory}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>监护人：{this.state.userInfo.guardian}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>亲属关系：{this.state.userInfo.relationship}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>求救电话：{this.state.userInfo.emergencyCall}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>管理员电话：{this.state.userInfo.adminPhone}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onHandlerEditUser}
                        >
                            <Text style={styles.buttonText}>修改信息</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onHandlerDeleteUser}
                        >
                            <Text style={styles.buttonText}>删除用户</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    //下拉刷新数据
    _onRefresh() {
        this.setState({refreshing: true});              //允许刷新
        this.onGetUser();                                    //重新获取数据
        this.setState({refreshing: false});              //停止刷新
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    textContainer:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: DevWidth*0.9,
        backgroundColor: '#FFF',
        margin:10,
    },
    text: {
        fontSize: 20,
    },
    infoItem: {
        margin:5,
    },
    buttonContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:8,
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
        textAlign: 'center',
        fontSize: 20,
    }
});
