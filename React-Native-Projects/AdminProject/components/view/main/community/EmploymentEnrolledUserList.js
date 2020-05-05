import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
    TextInput,
    SectionList
} from 'react-native';
import storage from '../../../model/storage'

//获取屏宽
const DevWidth = Dimensions.get('window').width;

export default class EmploymentEnrolledUserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            userList: [], //用户列表
            renderList: [], //渲染列表
            text: '',  // 输入文本
            id: null, //活动id
            userPhoneList: [], //用户手机号列表
        };
    }

    //接收活动id
    UNSAFE_componentWillMount() {
        const {id} = this.props.route.params;
        this.setState({
            id : id,
        })
    }

    componentDidMount() {
        this.onGetUserInfoList()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBox}>
                        <Image source={{uri:'asset:/TabBar/tabbar_discover.png'}} style={styles.searchIcon}/>
                        <TextInput style={styles.inputText}
                                   returnKeyType={'search'}
                                   maxLength={30}
                                   placeholder={'请输入姓名'}
                                   underlineColorAndroid='transparent'
                                   value={this.state.text}
                                   onChangeText={(text) => this.onChangeText(text)}
                        />
                    </View>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.renderList}                         //数据源
                    renderItem={this.renderItem.bind(this)}          //定义每条数据的渲染方法
                    ItemSeparatorComponent={this.renderItemSeparator.bind(this)}// item分隔线组件
                    refreshControl={                                  //下拉刷新组件
                        <RefreshControl
                            refreshing={this.state.refreshing}            //通过state.refreshing控制是否刷新
                            onRefresh={this._onRefresh.bind(this)}        //执行刷新函数
                        />
                    }
                />
            </View>
        );
    }

    //根据活动id获取用户手机数组
    onGetEnrolledUsers = () => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.1.3:3000/employmentEnrolledUsers/' + this.state.id,{  //获取该管理员管理的用户列表
                method: 'GET'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.setState({
                    userPhoneList:jsonData,
                })
                resolve(jsonData);
                //console.log(this.state.userPhoneList);
            })
                .catch((error) => {
                    console.warn(error);
                    reject(error);
                }).done();
        })
    }

    //根据用户的手机号数组获取用户的信息数组
    onGetUserInfoList = () => {
        this.onGetEnrolledUsers()
            .then((userPhoneList) => {
                userPhoneList.map((item,index) => {
                    //根据用户手机号获取用户信息
                    fetch('http://192.168.1.3:3000/user/' + item.userPhone, {  //根据用户手机号获取用户信息
                        method: 'GET'
                    }).then((response) => {
                        return response.json();
                    }).then((jsonData) => {
                        this.state.userList.push(jsonData[0]);
                        this.state.renderList.push(jsonData[0]);
                    })
                        .catch((error) => {
                            console.warn(error);
                        }).done();
                })
            })
    }


    // 输入内容
    onChangeText = (text) => {
        this.setState({
            text,
            renderList: this.filterText(text)
        })
    }

    // 关键词过滤
    filterText = (text) => {
        let data = this.state.userList
        if (text.length > 0) {
            return data.filter((v) => {
                return Object.keys(v).some((key) => {
                    return String(v[key]).toLowerCase().includes(text)
                })
            })
        }
        return data
    }

    //渲染单条数据
    renderItem(item) {
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTextName}>{item.item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    //渲染分割线
    renderItemSeparator() {
        return (
            <View style={styles.divideLine} ></View>
        );
    }

    //下拉刷新数据
    _onRefresh() {
        this.setState({refreshing: true});              //允许刷新
        // this.onGetUserInfoList(); //获取用户列表
        this.setState({refreshing: false});              //停止刷新
    }
}

//底部标签渲染函数

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    searchContainer: {
        flexDirection: 'row',   // 水平排布
        height:50,
        paddingLeft:10,
        paddingRight: 10,
        backgroundColor: 'gray',
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },
    searchBox:{//搜索框
        height:40,
        flexDirection: 'row',   // 水平排布
        flex:1,
        borderRadius: 5,  // 设置圆角边
        backgroundColor: 'white',
        alignItems: 'center',
        marginRight: 8,
    },
    searchIcon: {//搜索图标
        height: 20,
        width: 20,
        marginLeft: 5,
        resizeMode: 'stretch'
    },
    inputText:{
        flex:1,
        backgroundColor:'transparent',
        fontSize:15,
    },
    buttonContainer: {
        width:DevWidth,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'flex-end'
    },
    button: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#ff935c',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
    },
    itemContainer: {
        alignItems:"flex-start",
        margin:10
    },
    itemTextName: {
        textAlign: 'center',
        fontSize: 20,
    },
    itemTextOther: {
        textAlign: 'center',
        fontSize: 14,
        color:'#7b7b7b'
    },
    divideLine:{
        height: 1,
        backgroundColor: '#e8e8e8',
        marginLeft: 10,
    },
});

