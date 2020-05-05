import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    ToastAndroid
} from 'react-native';
import DatePicker from 'react-native-datepicker'; //选择日期

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default class EducationAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disTouchable:true,          //确认键是否可用，初始化为不可用
            title:null,             //标题
            context:null,            //内容
            location:null,          //地点
            startTime:null,           //开始时间
            endTime:null,             //结束时间
            maxNumber:null,           //限制人数
            enrollNumber: 0,          //报名人数默认为0
            attention:null,          //注意点
            adminPhone:null,         //管理员电话
            releaseTime:null,            //发布时间
            education: '',
        };
    }

    //获取管理员手机号
    UNSAFE_componentWillMount() {
        let nowTime = this.getNowDate();
        const {adminPhone} = this.props.route.params; //获取管理员手机
        this.setState({
            adminPhone: adminPhone,
            releaseTime: nowTime,
        })
    }

    //获取现在的时间
    getNowDate() {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        let hour = date.getHours().toString();
        let minute = date.getMinutes().toString();
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }

    //新增活动到数据库
    onPostEducation = () => {
        fetch('http:192.168.1.3:3000/education', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                context: this.state.context,
                location: this.state.location,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                maxNumber: this.state.maxNumber,
                enrollNumber: this.state.enrollNumber,
                attention: this.state.attention,
                adminPhone: this.state.adminPhone,
                releaseTime: this.state.releaseTime,
            })
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            this.setState({
                education:jsonData,
            })
            console.log(this.state.education)
            ToastAndroid.show("添加成功",ToastAndroid.SHORT);
            //转到活动列表
            this.props.navigation.navigate('Tab',{
                screen: 'CommunityRoot',
                params: {
                    screen: 'Community',
                    params: {
                        screen: 'Education',
                        params:{
                            screen: 'EducationList',
                            params:{adminPhone: this.state.adminPhone},
                        },
                    },
                },
            });
        })
            .catch((error) => {
                console.warn(error);
            }).done();
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        placeholder="活动标题"
                        style={styles.textInput}
                        maxLength={20}
                        value={this.state.title}
                        onChangeText={(text) =>{this.setState({title: text})}}
                    />
                    <TextInput
                        placeholder="活动内容"
                        style={styles.contextStyle}
                        multiline = {true}
                        maxLength={500}
                        value={this.state.context}
                        onChangeText={(text) =>{this.setState({context: text})}}
                    />
                    <TextInput
                        placeholder="限制人数"
                        style={styles.textInput}
                        maxLength={5}
                        keyboardType='numeric'
                        value={this.state.maxNumber}
                        onChangeText={(text) =>{this.setState({maxNumber: text})}}
                    />
                    <TextInput
                        placeholder="活动地点"
                        style={styles.textInput}
                        maxLength={50}
                        value={this.state.location}
                        onChangeText={(text) =>{this.setState({location: text})}}
                    />
                    <TextInput
                        placeholder="注意事项"
                        style={styles.textInput}
                        maxLength={50}
                        value={this.state.attention}
                        onChangeText={(text) =>{this.setState({attention: text})}}
                    />
                    <View style={styles.dateContainerAll}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.text}>开始时间:</Text>
                            <DatePicker
                                style={{width: DevWidth*0.4,margin:10}}
                                date={this.state.startTime}
                                mode="datetime"
                                format="YYYY-MM-DD HH:mm"
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                minuteInterval={10}
                                onDateChange={(datetime) => {this.setState({startTime: datetime});}}
                            />

                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.text}>结束时间:</Text>
                            <DatePicker
                                style={{width: DevWidth*0.4,margin:10}}
                                date={this.state.endTime}
                                mode="datetime"
                                format="YYYY-MM-DD HH:mm"
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                minuteInterval={10}
                                onDateChange={(datetime) => {this.setState({endTime: datetime});}}
                            />
                        </View>
                    </View>
                    {/*所有的用户信息是否都已经输入确认按钮才可按下*/}
                    {
                        this.state.title && this.state.context && this.state.maxNumber && this.state.location && this.state.attention
                        && this.state.startTime && this.state.endTime && this.state.releaseTime
                            ?
                            this.state.disTouchable = false
                            :
                            this.state.disTouchable = true
                    }
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            disabled={this.state.disTouchable}
                            onPress={this.onPostEducation}
                        >
                            <Text style={styles.buttonText}>确认</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#FFF',
    },
    contextStyle:{
        width: DevWidth*0.9,
        height: DevWidth*0.5,
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
        fontSize: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
    },
    dateContainerAll:{
        width: DevWidth,
        flexDirection:'row',
    },
    dateContainer:{
        width: DevWidth*0.4,
        margin:10,
    },
    dropdownButton: {
        height: 40,
        backgroundColor: '#c1dcdb',
        justifyContent: 'center',
        margin: 10,
        paddingLeft:10,
        width: DevWidth*0.3,
    },
    dropdownButtonText:{
        paddingLeft:10,
        fontSize: 15,
    },
    dropdownStyle:{
        width: DevWidth*0.3,
    },
    textContainer:{
        height: 40,
        paddingLeft: 10,
        margin: 10,
        borderWidth:1,
        width: DevWidth*0.9,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    text: {
        fontSize: 15,
    },
    textInput: {
        width: DevWidth*0.9,
        height: 40,
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
        fontSize: 15,
    },
    infoItem: {
        backgroundColor: '#91d6ff',
        marginTop:10,
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
        fontWeight: 'bold'
    },
});
