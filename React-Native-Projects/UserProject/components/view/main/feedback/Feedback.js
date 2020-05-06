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
    TextInput,
    ToastAndroid,
} from 'react-native';
import storage from '../../../model/storage';

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '', //用户信息
            userPhone: null, //用户手机号
            adminPhone: null,//管理员手机号
            refreshing: false,
            context: '', //反馈内容
        };
    }

    //获取用户手机号
    UNSAFE_componentWillMount() {
        this.getUserPhone();
    }

    //获取用户手机号
    getUserPhone() {
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
        this.onGetUser();
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
                            <Text style={styles.text}>账号：{this.state.userInfo.phone}</Text>
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
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder="反馈内容（个人信息有误/社区存在的问题/软件需要改进的地方）"
                            style={styles.textInput}
                            multiline = {true}
                            maxLength={500}
                            value={this.state.context}
                            onChangeText={(text) =>{this.setState({context: text})}}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onFeedbackSubmit}
                        >
                            <Text style={styles.buttonText}>提交反馈</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    //获取用户信息
    onGetUser = () => {
        return new Promise((resolve, reject) => {
            //获取用户手机号数据
            storage.load({
                key: 'user',
                id: '1'
            }).then(ret => {
                // 如果找到数据，则在then方法中返回
                fetch('http://192.168.1.3:3000/user/' + ret, {  //根据用户手机号获取用户信息
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
        })
    }

    //提交反馈按钮
    onFeedbackSubmit = () =>{
        if(0 === this.state.context.length){
            ToastAndroid.show('请正确填写反馈',ToastAndroid.SHORT);
        }else{
            //发布反馈
            this.onPostFeedback();
            ToastAndroid.show('提交反馈成功',ToastAndroid.SHORT);
            this.setState({
                context: '',
            })
        }

    }

    //新增一条反馈
    onPostFeedback = () => {
        fetch('http://192.168.1.3:3000/feedbackUserInfo',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userPhone: this.state.userPhone,
                context: this.state.context,
                adminPhone: this.state.userInfo.adminPhone,
                time: this.getNowDate()
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
        backgroundColor: '#F5FCFF',
    },
    textInputContainer: {
        height:0.4 * DevWidth,
        width: 0.9 * DevWidth,
        marginTop:20,
    },
    textInput: {
        height: 0.4 * DevWidth,
        width: 0.9 * DevWidth,
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 15,
        textAlignVertical: 'top',
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
    },
    button:{
        height:40,
        width:DevWidth*0.5,
        borderRadius:20,
        backgroundColor: '#91d6ff',
        justifyContent:'center',
        marginTop:10,
        marginBottom:10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
    }
});
