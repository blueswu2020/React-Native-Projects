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

export default class FeedbackRespond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            respond: '', //回复内容
            userPhone: null,//用户手机号
            adminPhone: null, //管理员手机号
            context: null,//反馈内容
            feedbackId:null,//反馈id
        };
    }

    //接受管理员手机号
    UNSAFE_componentWillMount() {
        const {feedback} = this.props.route.params;
        this.setState({
            feedbackId:feedback.id,
            userPhone:feedback.userPhone,
            adminPhone:feedback.adminPhone,
            context:feedback.context,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="回复用户反馈"
                        style={styles.textInput}
                        multiline = {true}
                        maxLength={500}
                        value={this.state.respond}
                        onChangeText={(text) =>{this.setState({respond: text})}}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onFeedbackSubmit}
                    >
                        <Text style={styles.buttonText}>确认</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    //回复反馈按钮
    onFeedbackSubmit = async () =>{
        if(0 === this.state.respond.length){
            ToastAndroid.show('请正确填写回复信息',ToastAndroid.SHORT);
        }else{
            //回复反馈
            await this.onPostFeedbackRespond();
            await this.onDeleteFeedback();
            ToastAndroid.show('回复成功',ToastAndroid.SHORT);
            this.props.navigation.navigate('FeedbackList')
        }

    }

    //新增一条反馈
    onPostFeedbackRespond = () => {
        fetch('http://192.168.1.3:3000/feedbackRespond',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userPhone: this.state.userPhone,
                adminPhone: this.state.adminPhone,
                feedbackId: this.state.feedbackId,
                respond: this.state.respond,
                context:this.state.context,
                time: this.getNowDate()
            })
        })
            .then((response) => response.json())
            .then((jsonData) => {console.log(jsonData)})
    }

    //删除一条反馈信息
    onDeleteFeedback = () => {
        fetch('http://192.168.1.3:3000/feedbackUserInfo/' + this.state.feedbackId, {  //根据反馈id删除反馈信息
            method: 'DELETE'
        }).then((response) => {
            console.log(response.rows);
        }).catch((error) => {
            console.warn(error);
        }).done();
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    textInputContainer: {
        height: DevWidth,
        width: 0.9 * DevWidth,
        marginTop:20,
    },
    textInput: {
        height: DevWidth,
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
