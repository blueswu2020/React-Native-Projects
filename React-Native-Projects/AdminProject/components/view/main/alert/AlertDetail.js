import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Alert,
    ScrollView,
    RefreshControl
} from 'react-native';
import { MapView } from "react-native-amap3d";
import Marker from 'react-native-amap3d/lib/js/maps/Marker';

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default class AlertDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: '',
            id: null, //活动id
            refreshing: false,
            userPhone: null, //用户手机号
            userInfo:[], //用户信息
            alert:[], //求救信息
            longitude: 0, //默认纬度
            latitude: 0,  //默认经度
        };
    }

    //获取活动id和用户手机号
    UNSAFE_componentWillMount() {
        const {id} = this.props.route.params;
        const {userPhone} = this.props.route.params;
        this.setState({
            id: id,
            userPhone: userPhone,
        })
    }

    componentDidMount() {
        this.onGetUser();
        this.onGetAlertById();
    }

    render() {
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
                        <Text style={styles.title}>老年人基本信息</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.text}>姓名：{this.state.userInfo.name}</Text>
                            <Text style={{fontSize: 20, marginTop:15,marginLeft:DevWidth*0.25,}}>性别：{this.state.userInfo.gender}</Text>
                        </View>
                        <Text style={styles.text}>出生年月：{this.state.userInfo.birthday}</Text>
                        <Text style={styles.text}>家庭住址：{this.state.userInfo.address}</Text>
                        <Text style={styles.text}>既往病史：{this.state.userInfo.caseHistory}</Text>
                        <Text style={styles.text}>联系电话：{this.state.userInfo.phone}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.text}>监护人：{this.state.userInfo.guardian}</Text>
                            <Text style={{fontSize: 20, marginTop:15,marginLeft:DevWidth*0.25,}}>关系：{this.state.userInfo.relationship}</Text>
                        </View>
                        <Text style={styles.text}>监护人电话：{this.state.userInfo.emergencyCall}</Text>
                        <Text style={styles.text}>求救发出时间：{this.state.alert.time}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text,{fontWeight:'bold'}]}>当前所在位置：{this.state.alert.location}</Text>
                            {/*<Text style={styles.text}>{this.state.alert.location}</Text>*/}
                        </View>
                        {/*获取高德地图api定位*/}
                        <View style={{height:0.85*DevWidth,width:0.85*DevWidth}}>
                            <MapView
                                style={StyleSheet.absoluteFill}
                                coordinate={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                }}
                                zoomLevel={18}
                                tilt={45}
                                showsIndoorMap
                            >
                                <MapView.Marker
                                    active
                                    draggable
                                    title="可拖拽的标记"
                                    onDragEnd={({ nativeEvent }) =>
                                        console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
                                    }
                                    coordinate={{
                                        latitude: this.state.latitude,
                                        longitude: this.state.longitude
                                    }}
                                >
                                    <View style={{width: 0.6*DevWidth}}>
                                        <Text>位置：{this.state.alert.location}</Text>
                                        <Text>经度：{this.state.latitude}</Text>
                                        <Text>纬度：{this.state.longitude}</Text>
                                    </View>
                                </MapView.Marker>
                            </MapView>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onAlertHandler}
                        >
                            <Text style={styles.buttonText}>记录事件</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    //监听已处理按钮,跳转到处理界面
    onAlertHandler = () => {
        this.props.navigation.navigate('AlertRecord',{
            alert: this.state.alert,
        })
    }

    //获取用户信息
    onGetUser = () => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.1.3:3000/user/' + this.state.userPhone, {  //根据用户手机号获取用户信息
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

    onGetAlertById = () => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.1.3:3000/getAlertById/' + this.state.id, {  //根据用户手机号获取用户信息
                method: 'GET'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.setState({
                    alert: jsonData[0],
                    latitude: jsonData[0].latitude,
                    longitude: jsonData[0].longitude,
                })
                resolve(jsonData)
            })
                .catch((error) => {
                    console.warn(error);
                    reject(error)
                }).done();
        })
    }

    //下拉刷新数据
    _onRefresh() {
        this.setState({refreshing: true});              //允许刷新
        this.onGetUser();
        this.onGetAlertById();                 //重新渲染
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
        marginTop: 20,
        marginLeft:10,
    },
    title: {
        fontSize: 25,
        fontWeight:'bold'
    },
    text: {
        fontSize: 20,
        marginTop:15,
    },
    infoItem: {
        margin:5,
    },
    buttonContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:8,
        flexDirection:'row'
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
