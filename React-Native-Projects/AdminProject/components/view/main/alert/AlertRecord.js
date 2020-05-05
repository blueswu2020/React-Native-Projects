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
} from 'react-native';

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default class AlertRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disTouchable:true,          //确认键是否可用，初始化为不可用
            cause: null,                //病因
            handleTime:null,            //发布时间
            remarks: null,              //备注
            alert: [],                  //求救信息
            alertHandled: [],           //求救信息记录内容
        };
    }

    //接收求救信息
    UNSAFE_componentWillMount() {
        const {alert} = this.props.route.params;
        this.setState({
            alert: alert,
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        placeholder="病因"
                        style={styles.textInput}
                        maxLength={50}
                        value={this.state.cause}
                        onChangeText={(text) =>{this.setState({cause: text})}}
                    />
                    <TextInput
                        placeholder="备注"
                        style={styles.contextStyle}
                        multiline = {true}
                        maxLength={100}
                        value={this.state.remarks}
                        onChangeText={(text) =>{this.setState({remarks: text})}}
                    />
                    {/*所有的记录信息是否都已经输入确认按钮才可按下*/}
                    {
                        this.state.cause && this.state.remarks
                            ?
                            this.state.disTouchable = false
                            :
                            this.state.disTouchable = true
                    }
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            disabled={this.state.disTouchable}
                            onPress={this.onConfirmHandler}
                        >
                            <Text style={styles.buttonText}>确认</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
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

    //处理确认按钮，新增处理记录，删除已处理求救信息,跳转到已处理界面
    onConfirmHandler = () => {
        this.onPostAlertHandled();
        this.onDeleteAlert();
        this.turnToAlertHandled();
    }

    //将求救事件存入已处理事件数据库中
    onPostAlertHandled = () => {
        fetch('http:192.168.1.3:3000/alertHandled', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userPhone: this.state.alert.userPhone,
                adminPhone: this.state.alert.adminPhone,
                alertTime: this.state.alert.time,
                longitude: this.state.alert.longitude,
                latitude: this.state.alert.latitude,
                location: this.state.alert.location,
                handleTime: this.getNowDate(),
                cause: this.state.cause,
                remarks: this.state.remarks,
            })
        }).then((response) => {
            return response.json();
        }).then((jsonData) => {
            this.setState({
                alertHandled:jsonData,
            })
            console.log(this.state.alertHandled)
        })
            .catch((error) => {
                console.warn(error);
            }).done();
    }

    //删除已处理的事件
    onDeleteAlert = () => {
        fetch('http://192.168.1.3:3000/alert/' + this.state.alert.id, {  //根据求救id删除求救信息
            method: 'DELETE'
        }).then((response) => {
            console.log(response.rows);
        }).catch((error) => {
            console.warn(error);
        }).done();
    }


    //跳转到求救信息列表
    turnToAlertHandled = () => {
        this.props.navigation.navigate('AlertList')
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
        height: DevWidth*0.7,
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
        fontSize: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
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
