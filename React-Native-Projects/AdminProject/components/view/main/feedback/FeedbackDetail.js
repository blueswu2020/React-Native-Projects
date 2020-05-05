import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    RefreshControl, FlatList, Image, TextInput, TouchableOpacity,
} from 'react-native';
import storage from '../../../model/storage';
import {MapView} from 'react-native-amap3d';

//获取屏宽
const DevWidth=Dimensions.get('window').width;
const DevHeight = Dimensions.get('window').height;

export default class FeedbackDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:null, //反馈id
            feedback: '' //反馈信息
        };
    }

    //获取反馈id
    UNSAFE_componentWillMount() {
        const {id} = this.props.route.params;
        this.setState({
            id: id,
        })
    }


    componentDidMount() {
        this.onGetFeedbackById()
    }

    render() {
        return(
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
                        <Text style={styles.text}>账号：{this.state.feedback.userPhone}</Text>
                        <Text style={styles.text}>反馈内容：{this.state.feedback.context}</Text>
                        <Text style={styles.text}>反馈时间：{this.state.feedback.time}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onFeedbackRespond}
                        >
                            <Text style={styles.buttonText}>回复反馈</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    //根据反馈id获取反馈信息
    onGetFeedbackById = () => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.1.3:3000/feedbackUserInfoById/' + this.state.id, {  //根据用户手机号获取用户信息
                method: 'GET'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.setState({
                    feedback: jsonData[0],
                })
                resolve(jsonData)
            })
                .catch((error) => {
                    console.warn(error);
                    reject(error)
                }).done();
        })
    }

    onFeedbackRespond = () => {
        this.props.navigation.navigate('FeedbackRespond',{
            feedback:this.state.feedback //传递反馈信息
        })
    }

    //下拉刷新数据
    _onRefresh() {
        this.setState({refreshing: true});              //允许刷新
        this.onGetFeedbackById();                 //重新渲染
        this.setState({refreshing: false});              //停止刷新
    }
}

//底部标签渲染函数
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
