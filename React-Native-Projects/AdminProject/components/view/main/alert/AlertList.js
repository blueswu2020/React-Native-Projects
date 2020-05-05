import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
    TextInput,
    FlatList,
    RefreshControl,
    Alert,
    AppState,
    Button
} from 'react-native';
import storage from '../../../model/storage';
import BackgroundJob from 'react-native-background-job';
import NotifService from '../../../model/NotifService';
import appConfig from '../../../../app.json';

//获取屏宽
const DevWidth=Dimensions.get('window').width;

const exactJobKey = "exactJobKey";

BackgroundJob.register({
    jobKey: exactJobKey,
    job: () => {
        console.log(`${new Date()}background running!. Key = ${exactJobKey}`);
        new AlertScreen().onSetLocalNotify();
    }
});

export default class AlertScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false, //刷新
            adminPhone:null, //管理员手机号
            alertList: [], //求救信息
            userInfo: [], //用户信息
            badgeCount: 0, //显示于导航栏上的小标
        };

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
    }

    //接收管理员手机号
    UNSAFE_componentWillMount() {
        BackgroundJob.cancelAll();
        //获取数据
        storage.load({
            key: 'user',
            id: '1'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            this.setState({
                adminPhone: ret,
            })
            //console.log(this.state.adminPhone);
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

    componentDidMount() {
        this.onGetAlert();
        //每秒后台请求一次，查看是否有alert
        BackgroundJob.schedule({
            jobKey: exactJobKey,
            period: 1000, //每秒一次
            notificationTitle: "Notification title",
            notificationText: "Notification text",
            allowWhileIdle: true,
            exact: true
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.alertList}                         //数据源
                    renderItem={this.renderItem.bind(this)}          //定义每条数据的渲染方法
                    ItemSeparatorComponent={this. renderItemSeparator.bind(this)}// item分隔线组件
                    refreshControl={                                  //下拉刷新组件
                        <RefreshControl
                            refreshing={this.state.refreshing}            //通过state.refreshing控制是否刷新
                            onRefresh={this._onRefresh.bind(this)}        //执行刷新函数
                        />
                    }
                />
            </View>
        );
    }

    //渲染单条数据
    renderItem(item) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.showDetail(item.item)}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTextTitle}>手机号：{item.item.userPhone}</Text>
                    <Text style={styles.itemTextOther}>时间：{item.item.time}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    //跳转到求救信息详情页
    showDetail(item) {
        this.props.navigation.navigate('AlertDetail',
            {
                id: item.id,  //求救id
                userPhone: item.userPhone,  //用户手机号
            });
    }

    //渲染分割线
    renderItemSeparator() {
        return (
            <View style={styles.divideLine} ></View>
        );
    }

    //下拉刷新数据
    _onRefresh() {
        this.setState({refreshing: true});              //允许刷新
        this.onGetAlert(); //获取活动列表
        this.setState({refreshing: false});              //停止刷新
    }

    //根据管理员手机号获取到求救数据
    onGetAlert = () => {
        return new Promise((resolve, reject) => {
            //获取管理员手机号
            storage.load({
                key: 'user',
                id: '1'
            }).then(ret => {
                // 如果找到数据，则在then方法中返回
                fetch('http://192.168.1.3:3000/alert/' + ret ,{  //获取该管理员管理的用户列表
                    method: 'GET'
                }).then((response) => {
                    return response.json();
                }).then((jsonData) => {
                    this.setState({
                        alertList: jsonData,
                        badgeCount: jsonData.length,
                    })
                    console.log(jsonData.length);
                    resolve(jsonData)
                })
                    .catch((error) => {
                        console.warn(error);
                        reject(error)
                    }).done();
                //console.log(this.state.adminPhone);
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
        })
    }

    onRegister(token) {
        Alert.alert('Registered !', JSON.stringify(token));
        console.log(token);
        this.setState({registerToken: token.token, fcmRegistered: true});
    }

    onNotif(notif) {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
    }

    //发送通知
    onSetLocalNotify = () => {
        this.onGetAlert()
            .then((alertList) => {
                if(alertList.length > 0 ){
                    let message = "接收到紧急求救，请马上处理";
                    this.notif.localNotif(message);       //发送通知
                }
            })
    }

}

//底部标签渲染函数
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    inputText:{
        flex:1,
        backgroundColor:'transparent',
        fontSize:15,
    },
    buttonContainer: {
        width:DevWidth,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'flex-end'
    },
    button: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#ff935c',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
    },
    itemContainer: {
        alignItems:"flex-start",
        margin:10
    },
    itemTextTitle: {
        textAlign: 'center',
        fontSize: 20,
    },
    itemTextOther: {
        textAlign: 'center',
        fontSize: 14,
        color:'#7b7b7b'
    },
    divideLine:{
        height: 1,
        backgroundColor: '#e8e8e8',
        marginLeft: 10,
    },
});

