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
import DatePicker from 'react-native-datepicker';
import storage from '../../../model/storage'; //选择日期

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default class UserAdd extends Component {
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

    //接受管理员手机号和用户手机号
    UNSAFE_componentWillMount() {
        const {phone} = this.props.route.params;
        this.setState({
            phone:phone,
        })
        //获取数据
        storage.load({
            key: 'user',
            id: '1'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            this.setState({
                adminPhone: ret,
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
                            defaultValue={'请选择'}
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
                        onPress={this.onPostUser}
                    >
                        <Text style={styles.buttonText}>确认</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    //新增用户到数据库
    onPostUser = () => {
            fetch('http:192.168.1.3:3000/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    gender: this.state.gender,
                    birthday: this.state.birthday,
                    address: this.state.address,
                    phone: this.state.phone,
                    caseHistory: this.state.caseHistory,
                    guardian: this.state.guardian,
                    relationship: this.state.relationship,
                    emergencyCall: this.state.emergencyCall,
                    adminPhone: this.state.adminPhone,
                })
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.setState({
                    userInfo:jsonData,
                })
                console.log(this.state.userInfo)
                ToastAndroid.show("新增用户成功",ToastAndroid.SHORT);
                //转到用户列表
                this.props.navigation.navigate('UserList');
            })
                .catch((error) => {
                    console.warn(error);
                }).done();
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
