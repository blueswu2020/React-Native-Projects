import React, {useState, useEffect, Component} from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
    ToastAndroid, PermissionsAndroid,
} from 'react-native';
//import Geolocation from 'react-native-geolocation-service'; //引入位置信息
import storage from '../../../model/storage';
import {Geolocation,init} from 'react-native-amap-geolocation'; //使用高德api代替谷歌

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default  class AlertScreen extends Component{
    constructor(props) {
        super(props);
        this.state={
            text: '!',  //按钮文本
            userInfo: [], //用户信息
            userPhone: null, //用户手机号
            adminPhone: null, //管理员手机号
            time: null,  //发布时间
            latitude: 0, //纬度
            longitude: 0, //经度
            location: '未知',  //发布地址
            alert: '', //求救信息
        }
        this.BDKey = 'Hw8U0Z9m0ZFn7lXU55O3iHrfaLerKAoE'; //百度地图API的Key
        this.GDKey= '39505a07953de82a1253b1bc790c3fae'; //高德地图API的Key
    }
    timeChange;

    //获取用户手机号
    UNSAFE_componentWillMount() {
        //获取数据
        storage.load({
            key: 'user',
            id: '1'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            this.setState({
                userPhone: ret,
            })
            //console.log(ret);
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
        // this.onGetUser();
        //this.getPositions();
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.button}
                    onLongPress={this._onLongPress}
                    onPressIn={this._onPressIn}
                    onPressOut={this._onPressOut}
                    activeOpacity={0.5}
                    delayLongPress={3000}  //设置长按时间为3秒
                    underlayColor='green'
                >
                    <Text style={styles.buttonText}>{this.state.text}</Text>
                </TouchableHighlight>
                <Text style={styles.text}>长按发出求救</Text>
            </View>
        );
    }

    //按下按钮立即触发
    _onPressIn = () => {
        //获取位置
        this.getPositions();
        //获取用户
        this.onGetUser();
        let time = 3;
        const clock = () => {
            if (time > 0) {
                //当time>0时执行更新方法
                this.setState({
                    text: time,
                });
                time = time - 1;
            } else {
                //当time=0时执行终止循环方法
                clearInterval(this.timeChange);
            }
        };
        this.timeChange = setInterval(clock,800); //启动计时器
    }

    //松开按钮触发
    _onPressOut = () => {
        this.setState({
            text: '!',
        })
        clearInterval(this.timeChange); //停止计时器
    }

    //长按触发
    _onLongPress = () => {
        //获取当下时间
        this.setState({
            time: this.getNowDate(),
        })
        //未获取到数据
        if('未知' === this.state.location){
            ToastAndroid.show("获取位置信息失败，请重新尝试",ToastAndroid.SHORT);
        }else{
            this.onUpdateAlert();  //添加到数据库
            ToastAndroid.show("求救已发送",ToastAndroid.SHORT);
            this.props.navigation.navigate('AlertSend');//界面跳转
        }
    }

    //根据用户手机号获取用户信息
    onGetUser = () => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.1.3:3000/user/' + this.state.userPhone,{
                method: 'GET'
            })
                .then((response) => response.json())
                .then((jsonData) => {
                    this.setState({
                        userInfo: jsonData[0],
                    })
                    console.log(this.state.userInfo);
                    resolve(this.state.userInfo); //返回用户信息
                })
                .catch((error) => {
                    console.log(error)
                    reject(error);
                }).done();
        })
    }

    //根据用户手机号获取求救信息
    onGetAlertByUserPhone = () => {
        return new Promise((resolve, reject) => {
            this.onGetUser()
                .then((userInfo) => {
                    fetch('http://192.168.1.3:3000/getAlertByUserPhone/' + userInfo.phone,{
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((jsonData) => {
                            this.setState({
                                alert: jsonData,
                            })
                            console.log(this.state.alert);
                            resolve(this.state.alert);
                        })
                        .catch((error) => {
                            console.log(error)
                            reject(error);
                        }).done();
                })
        })
    }

    //在用户已经发送求救信息，并且管理员还未处理的情况下又发送一遍求救则修改一条求救信息，更新数据库，给管理员发通知
    onUpdateAlert = () => {
        this.onGetAlertByUserPhone()
            .then((alert) => {
                if(0 === alert.length){ //如果用户没发送过alert,则新增一条求救
                    this.onPostAlert();
                }else{//如果用户发送给alert,则更新alert
                    fetch('http://192.168.1.3:3000/alert/',{
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            time: this.state.time,
                            longitude:this.state.longitude,
                            latitude:this.state.latitude,
                            location:this.state.location,
                            userPhone: this.state.userPhone,
                        })
                    }).then((response) => {
                        return response.json();
                    }).catch((error) => {
                        console.warn(error);
                    }).done();
                }
            })
    }

    //新增一条求救信息,更新数据库，给管理员发通知
    onPostAlert = () => {
        fetch('http://192.168.1.3:3000/alert',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userPhone: this.state.userPhone,
                adminPhone: this.state.userInfo.adminPhone,
                time: this.state.time,
                location: this.state.location,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
            })
        })
            .then((response) => response.json())
            .then((jsonData) => {console.log(jsonData)})
    }

    //获取现在的时间
    getNowDate() {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        let hour = date.getHours().toString();
        let minute = date.getMinutes().toString();
        let second = date.getSeconds().toString();
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    getPositions = async () => {
            // 对于 Android 需要自行根据需要申请权限
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
            // 使用自己申请的高德 App Key 进行初始化
            await init({
                ios: "9bd6c82e77583020a73ef1af59d0c759",
                android: "836ab703d8a28d5f0ff21000bcf8a1c4"
            });
            /** 获取当前位置信息 */
            Geolocation.getCurrentPosition(
                location => {
                    this.setState({
                        longitude: location.coords.longitude,//经度
                        latitude: location.coords.latitude,//纬度
                    });
                    console.log(location.coords.longitude)
                    console.log(location.coords.latitude)
                    //通过调用百度地图逆地理接口，传入经纬度获取位置信息
                    fetch("http://api.map.baidu.com/reverse_geocoding/v3/?ak=Hw8U0Z9m0ZFn7lXU55O3iHrfaLerKAoE&output=json&coordtype=wgs84ll&location=" + this.state.latitude + "," + this.state.longitude, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: ``
                    })
                        .then((response) => response.json())
                        .then((jsonData) => {
                            try {
                                this.setState({
                                    location: jsonData.result.formatted_address,
                                });
                                console.log(jsonData.result.formatted_address)
                            } catch (e) {
                                console.log(e)
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    //访问网络结束
                }, (error) => {
                    // ToastAndroid.show('失败：' + JSON.stringify(error.message), ToastAndroid.SHORT);
                    console.warn('失败：' + JSON.stringify(error.message))
                }, {
                    // 提高精确度，但是获取的速度会慢一点
                    enableHighAccuracy: true,
                    // 设置获取超时的时间5秒
                    timeout: 5000,
                    // 示应用程序的缓存时间，每次请求都是立即去获取一个全新的对象内容
                    maximumAge: 1000
                }
            )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#F5FCFF',
    },
    button:{
        height: DevWidth*0.5,
        width: DevWidth*0.5,
        borderRadius: DevWidth,
        backgroundColor: 'red',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 150,
        fontWeight: 'bold'
    },
    text: {
        marginTop: 20,
        fontSize: 20,
    },
    mapContainer:{
        height: DevWidth*0.5,
        width: DevWidth,
    }
})
