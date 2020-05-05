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
import ModalDropdown from 'react-native-modal-dropdown'; //下拉选择性别
import DatePicker from 'react-native-datepicker'; //选择日期

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disTouchable:true,          //确认键是否可用，初始化为不可用
            name:null,             //姓名
            gender:null,            //性别
            birthday:null,          //生日
            address:null,           //住址
            phone:null,             //手机号
            caseHistory:null,           //病史
            guardian:null,          //监护人
            relationship:null,          //关系
            emergencyCall:null,         //紧急电话
            adminPhone:null,            //管理员电话
            userInfo: '',
        };
    }

    //接收用户信息
    UNSAFE_componentWillMount() {
        const {userInfo} = this.props.route.params;
        this.setState({
            userInfo: userInfo,
            name: userInfo.name,
            gender: userInfo.gender,
            birthday: userInfo.birthday,
            address: userInfo.address,
            phone: userInfo.phone,
            caseHistory: userInfo.caseHistory,
            guardian: userInfo.guardian,
            relationship: userInfo.relationship,
            emergencyCall: userInfo.emergencyCall,
            adminPhone: userInfo.adminPhone,
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>姓名</Text>
                        <TextInput
                            placeholder="用户姓名"
                            style={styles.textInput}
                            maxLength={20}
                            value={this.state.name}
                            onChangeText={(text) =>{this.setState({name: text})}}
                        />
                    </View>
                    <View style={styles.divideLine} ></View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>住址</Text>
                        <TextInput
                            placeholder="住址"
                            style={styles.textInput}
                            maxLength={50}
                            value={this.state.address}
                            onChangeText={(text) =>{this.setState({address: text})}}
                        />
                    </View>
                    <View style={styles.divideLine} ></View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>病史</Text>
                        <TextInput
                            placeholder="既往病史"
                            style={styles.textInput}
                            maxLength={50}
                            value={this.state.caseHistory}
                            onChangeText={(text) =>{this.setState({caseHistory: text})}}
                        />
                    </View>
                    <View style={styles.divideLine} ></View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>紧急联系人</Text>
                        <TextInput
                            placeholder="姓名"
                            style={styles.textInput}
                            maxLength={20}
                            value={this.state.guardian}
                            onChangeText={(text) =>{this.setState({guardian: text})}}
                        />
                    </View>
                    <View style={styles.divideLine} ></View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>关系</Text>
                        <TextInput
                            placeholder="与紧急联系人关系"
                            style={styles.textInput}
                            maxLength={5}
                            value={this.state.relationship}
                            onChangeText={(text) =>{this.setState({relationship: text})}}
                        />
                    </View>
                    <View style={styles.divideLine} ></View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>电话</Text>
                        <TextInput
                            placeholder="紧急联系人电话"
                            style={styles.textInput}
                            maxLength={20}
                            value={this.state.emergencyCall}
                            onChangeText={(text) =>{this.setState({emergencyCall: text})}}
                        />
                    </View>
                    <View style={styles.divideLine} ></View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>性别</Text>
                        <ModalDropdown
                            defaultValue={this.state.gender}
                            options={['男', '女']}
                            style={styles.dropdownButton}
                            textStyle={styles.dropdownButtonText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={
                                (gender) => {
                                    if(0 == gender){
                                        this.setState({gender: '男'});
                                    }else{
                                        this.setState({gender: '女'});
                                    }
                                }
                            }
                        />
                    </View>
                    <View style={styles.divideLine} ></View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>出生年月 </Text>
                        <DatePicker
                            style={{width: DevWidth*0.4,margin:10}}
                            date={this.state.birthday}
                            mode="date"
                            format="YYYY-MM-DD"
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
                            onDateChange={(datetime) => {this.setState({birthday: datetime});}}
                        />
                    </View>
                    {/*所有的用户信息是否都已经输入确认按钮才可按下*/}
                    {
                        this.state.name && this.state.gender && this.state.birthday && this.state.address && this.state.caseHistory
                        && this.state.guardian && this.state.relationship && this.state.emergencyCall
                            ?
                            this.state.disTouchable = false
                            :
                            this.state.disTouchable = true
                    }
                    <TouchableOpacity
                        style={styles.button}
                        disabled={this.state.disTouchable}
                        onPress={this.onConfirmHandler}
                    >
                        <Text style={styles.buttonText}>确认</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    //处理确认按钮，判断管理员是否修改了用户信息
    onConfirmHandler = () => {
        if (
            this.state.name === this.state.userInfo.name
            && this.state.gender === this.state.userInfo.gender
            && this.state.birthday === this.state.userInfo.birthday
            && this.state.address === this.state.userInfo.address
            && this.state.caseHistory === this.state.userInfo.caseHistory
            && this.state.guardian === this.state.userInfo.guardian
            && this.state.relationship === this.state.userInfo.relationship
            && this.state.emergencyCall === this.state.userInfo.emergencyCall
        ){
            Alert.alert('提示：','未修改任何内容')
        }else{
            this.onUpdateUser();
            ToastAndroid.show("信息修改成功",ToastAndroid.SHORT);
            this.turnToUserDetail();
        }
    }

    //修改用户信息
    onUpdateUser = () => {
        fetch('http://192.168.1.3:3000/userModify/',{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                gender: this.state.gender,
                birthday: this.state.birthday,
                address: this.state.address,
                caseHistory: this.state.caseHistory,
                guardian: this.state.guardian,
                relationship: this.state.relationship,
                emergencyCall: this.state.emergencyCall,
                phone: this.state.phone,
            })
        }).then((response) => {
            return response.json();
        }).catch((error) => {
            console.warn(error);
        }).done();
    }

    //跳转到用户信息界面
    turnToUserDetail = () => {
        this.props.navigation.navigate('UserDetail', {
            userPhone: this.state.phone
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor: '#F5FCFF',
        marginTop:20,
    },
    inputContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor:'#FFF',
        width:DevWidth,
        paddingLeft:10
    },
    text:{
        fontSize:18,
        justifyContent:'center',
    },
    textInput: {
        width:DevWidth*0.8,
        paddingLeft: 20,
        fontSize: 18,
    },
    divideLine:{
        height: 1,
        backgroundColor: '#e8e8e8',
        marginLeft: 10,
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
        textAlign:'center',
        color:'black',
        fontSize:18
    },
    dropdownButton: {
        height: 40,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        margin: 10,
        paddingLeft:10,
        width: DevWidth*0.8,
    },
    dropdownButtonText:{
        paddingLeft:10,
        fontSize: 18,
    },
    dropdownStyle:{
        width: DevWidth*0.8,
        fontSize: 18,
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
    infoItem: {
        backgroundColor: '#91d6ff',
        marginTop:10,
    },
    buttonContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
});
