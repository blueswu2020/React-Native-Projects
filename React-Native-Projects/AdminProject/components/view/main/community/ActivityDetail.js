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

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: '',
            id: null, //活动id
            refreshing: false,
        };
    }

    //获取活动id
    UNSAFE_componentWillMount() {
        const {id} = this.props.route.params;
        this.setState({
            id: id,
        })
    }

    componentDidMount() {
        this.onGetActivity();
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
                            <Text style={styles.text}>活动ID：{this.state.activity.id}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>标题：{this.state.activity.title}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>主要内容：{this.state.activity.context}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>活动地点：{this.state.activity.location}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>时间：{this.state.activity.startTime} 至 {this.state.activity.endTime}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>限制人数：{this.state.activity.maxNumber}</Text>
                        </View>
                        <View style={{margin:5,flexDirection: 'row'}}>
                            <Text style={styles.text}>报名人数：{this.state.activity.enrollNumber}</Text>
                            <TouchableOpacity
                                style={{marginLeft:20, backgroundColor: '#c2e3ff',borderRadius:20,width:50,alignItems:'center'}}
                                onPress={this.onShowHandler}
                            >
                                <Text style={styles.text}>查看</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>注意事项：{this.state.activity.attention}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>发布时间：{this.state.activity.releaseTime}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.text}>管理员电话：{this.state.activity.adminPhone}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onEditActivityHandler}
                        >
                            <Text style={styles.buttonText}>修改信息</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onDeleteActivityHandler}
                        >
                            <Text style={styles.buttonText}>删除活动</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    //跳转到已报名的用户列表
    onShowHandler = () => {
        this.props.navigation.navigate('ActivityEnrolledUserList',{
            id: this.state.id,
            });
    }

    //获取活动信息
    onGetActivity = () => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.1.3:3000/activity/' + this.state.id, {  //根据活动id获取活动信息
                method: 'GET'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.setState({
                    activity: jsonData[0],
                })
                resolve(jsonData)
            })
                .catch((error) => {
                    console.warn(error);
                    reject(error)
                }).done();
        })
    }

    //处理删除用户按钮
    onDeleteActivityHandler = () => {
        this.alertHandler();
    }

    //弹出删除确认框
    alertHandler = () => {
        Alert.alert('提示','确认删除吗？',
            [
                {text:"确认", onPress:this.onDoDeleteActivity},
                {text:"取消"},
            ]
        );
    }

    //删除活动并跳转界面
    onDoDeleteActivity = () => {
        this.onDeleteActivity();
        this.turnToActivityList();
    }

    //删除活动信息
    onDeleteActivity = () => {
        fetch('http://192.168.1.3:3000/activity/' + this.state.id, {  //根据活动id删除活动
            method: 'DELETE'
        }).then((response) => {
            console.log(response.rows);
        }).catch((error) => {
            console.warn(error);
        }).done();
    }

    //跳转到活动列表
    turnToActivityList = () => {
        this.props.navigation.navigate('Tab',{
            screen: 'CommunityRoot',
            params: {
                screen: 'Community',
                params: {
                    screen: 'Activity',
                    params:{
                        screen: 'ActivityList',
                        params:{adminPhone: this.state.adminPhone},
                    },
                },
            },
        });
    }

    //处理编辑信息按钮
    onEditActivityHandler = () => {
        this.turnToActivityEdit();
    }

    //跳转到编辑信息界面
    turnToActivityEdit = () => {
        this.props.navigation.navigate('ActivityEdit',{
            activity: this.state.activity,
        })
    }

    //下拉刷新数据
    _onRefresh() {
        this.setState({refreshing: true});              //允许刷新
        this.onGetActivity();                     //重新渲染
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
