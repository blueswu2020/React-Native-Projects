import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Alert,
    ScrollView,
    RefreshControl,
    ToastAndroid
} from 'react-native';
import storage from '../../../model/storage';
import appConfig from '../../../../App';
import NotifService from '../../../model/NotifService';
//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default class EmploymentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employment: '',
            id: null, //活动id
            enrollNumber: null, //报名的人数
            refreshing: false, //判断是否可以刷新
            text: null, //按钮中的文字
            touchDisabled : null, //判断按钮是否可用
            phone : null, //用户手机号
            naData: [],
            senderId: appConfig.senderID,
        };

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
    }

    //获取数据
    UNSAFE_componentWillMount() {
        //获取活动id
        const {id} = this.props.route.params;
        this.setState({
            id: id,
        })
        //获取用户手机号
        storage.load({
            key: 'user',
            id: '1'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            this.setState({
                phone: ret,
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
        this.onGetEnroll();
        this.onGetEmployment();
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
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>标题：{this.state.employment.title}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>主要内容：{this.state.employment.context}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>活动地点：{this.state.employment.location}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>时间：{this.state.employment.startTime} 至 {this.state.employment.endTime}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>限制人数：{this.state.employment.maxNumber}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>报名人数：{this.state.employment.enrollNumber}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>注意事项：{this.state.employment.attention}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>发布时间：{this.state.employment.releaseTime}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>管理员电话：{this.state.employment.adminPhone}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onSetScheduleNotify}
                            disabled={this.state.touchDisabled}
                        >
                            <Text style={styles.buttonText}>{this.state.text}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
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

    //设置定时通知
    onSetScheduleNotify = () => {
        let getTime = this.state.employment.startTime; //获取活动开始时间
        let startTime = getTime.replace(/-/g,"/");
        let startDate = new Date(startTime);            //把字符串转化为日期类型
        let nowDate = Date.now();                   //获取现在时间
        if(startDate > nowDate){                        //如果现在还能报名,则报名可用，并设置活动提醒
            this.onJoinInHandler();
            let noticeTime = startDate - nowDate - 60*60*1000; //提前一个小时提醒
            let activity = this.state.activity;
            let message = "您报名的活动:" + activity.title + "将于一小时内开始，请尽快赶到活动现场："+ activity.location;
            this.notif.scheduleNotif(noticeTime,message);       //根据现在的差值时间设置提醒
        }else{                                          //如果已经不能报名了
            ToastAndroid.show('活动已经开始，无法报名，请谅解',ToastAndroid.SHORT)
        }
    }

    //获取活动报名信息
    onGetEnroll = () => {
        fetch('http://192.168.1.3:3000/employmentEnroll/' + this.state.id, {  //根据活动id查找报名用户是否存在
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            let list1 = [];
            for(let i = 0;i < jsonData.length;i++){
                list1.push(jsonData[i].userPhone)
            }
            console.log(list1);
            if(0 === jsonData.length){ //如果返回值为空数组，就说明报名人数为0
                this.setState({
                    text: '报名',
                    touchDisabled: false,
                })
            }else{
                if(list1.includes(this.state.phone)){ //如果包含用户手机号，就说明用户已经报名
                    this.setState({
                        text: '已报名',
                        touchDisabled: true,
                    })
                }else{ //否则说明用户未报名
                    this.setState({
                        text: '报名',
                        touchDisabled: false,
                    })
                }
            }

        })
            .catch((error) => {
                console.warn(error);
            }).done();
    }


    //获取活动信息
    onGetEmployment = () => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.1.3:3000/employment/' + this.state.id, {  //根据活动id获取活动信息
                method: 'GET'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.setState({
                    employment: jsonData[0],
                    enrollNumber: jsonData[0].enrollNumber,
                })
                resolve(jsonData)
            })
                .catch((error) => {
                    console.warn(error);
                    reject(error)
                }).done();
        })
    }

    //新增活动报名信息
    onPostEmploymentEnroll = () => {
        fetch('http:192.168.1.3:3000/employmentEnroll', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({employmentId: this.state.id, userPhone: this.state.phone})
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            this.setState({
                naData:jsonData,
            })
            console.log(this.state.naData)
        })
    }

    //修改活动信息
    onUpdateEmployment = () => {
        fetch('http://192.168.1.3:3000/employmentEnrollNumber/',{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                enrollNumber: this.state.enrollNumber,
                id: this.state.id,
            })
        }).then((response) => {
            return response.json();
        }).catch((error) => {
            console.warn(error);
        }).done();
    }

    //处理报名按钮
    onJoinInHandler = () => {
        //如果人数已满的话就提示人数已满
        if(this.state.employment.maxNumber > this.state.enrollNumber){
            this.state.enrollNumber += 1;
            this.setState({
                text: '已报名',
                touchDisabled : true,
            })
            this.onPostEmploymentEnroll();
            this.onUpdateEmployment();
            ToastAndroid.show("已报名", ToastAndroid.SHORT);
        }else{
            ToastAndroid.show("报名人数已满", ToastAndroid.SHORT);
        }

    }

    //下拉刷新数据
    _onRefresh() {
        this.setState({refreshing: true});              //允许刷新
        this.componentDidMount();                           //重新获取数据
        this.setState({refreshing: false});              //停止刷新
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    textContainer:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: DevWidth*0.9,
        backgroundColor: '#F5FCFF',
        margin:10,
        paddingLeft:10,
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
        flexDirection:'row'
    },
    button:{
        height:40,
        width:DevWidth*0.3,
        borderRadius:20,
        backgroundColor: '#91d6ff',
        justifyContent:'center',
        margin:20,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
    }
});
