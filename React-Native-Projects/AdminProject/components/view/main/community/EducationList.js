import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    FlatList,
    RefreshControl,
} from 'react-native';
import storage from '../../../model/storage'


/*
 * @description    根据某个字段实现对json数组的排序
 * @param   array  要排序的json数组对象
 * @param   field  排序字段（此参数必须为字符串）
 * @param   reverse 是否倒序（默认为false）
 * @return  array  返回排序后的json数组
*/
function jsonSort(array, field, reverse) {
    //数组长度小于2 或 没有指定排序字段 或 不是json格式数据
    if(array.length < 2 || !field || typeof array[0] !== "object") return array;
    //数字类型排序
    if(typeof array[0][field] === "number") {
        array.sort(function(x, y) { return x[field] - y[field]});
    }
    //字符串类型排序
    if(typeof array[0][field] === "string") {
        array.sort(function(x, y) { return x[field].localeCompare(y[field])});
    }
    //倒序
    if(reverse) {
        array.reverse();
    }
    return array;
}

//获取屏宽
const DevWidth = Dimensions.get('window').width;
export default class EducationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            educationList: [], //教育活动列表
            renderList: [], //渲染列表
            adminPhone:null,
            text: ''  // 输入文本
        };
    }

    //接收管理员手机号
    UNSAFE_componentWillMount() {
        this.getAdminPhone();
    }

    getAdminPhone = () => {
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

    componentDidMount() {
        this.onGetEducations()
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
                                   placeholder={'请输入活动关键字'}
                                   underlineColorAndroid='transparent'
                                   value={this.state.text}
                                   onChangeText={(text) => this.onChangeText(text)}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.gotoEducationAdd}
                    >
                        <Text style={styles.buttonText}>添加</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.renderList}                         //数据源
                    renderItem={this.renderItem.bind(this)}          //定义每条数据的渲染方法
                    ItemSeparatorComponent={this. renderItemSeparator.bind(this)}// item分隔线组件
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

    // 输入内容
    onChangeText = (text) => {
        this.setState({
            text,
            renderList: this.filterText(text)
        })
    }

    // 关键词过滤
    filterText = (text) => {
        let data = this.state.educationList
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
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.showDetail(item.item)}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTextTitle}>{item.item.title}</Text>
                    <Text style={styles.itemTextOther}>活动地点：{item.item.location}</Text>
                    <Text style={styles.itemTextOther}>活动时间：{item.item.startTime}至{item.item.endTime}</Text>
                    <Text style={styles.itemTextOther}>发布时间：{item.item.releaseTime}</Text>
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
        this.onGetEducations(); //获取活动列表
        this.setState({refreshing: false});              //停止刷新
    }

    //获取活动列表
    onGetEducations = () => {
        //获取数据
        storage.load({
            key: 'user',
            id: '1'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            fetch('http://192.168.1.3:3000/educations/' + ret ,{  //获取该管理员管理的用户列表
                method: 'GET'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                let json1 = jsonSort(jsonData,'releaseTime',true); //根据发布日期对取回的json数组进行排序
                this.setState({
                    educationList: json1,
                    renderList: json1,
                })
                //console.log(this.state.educationList);
            })
                .catch((error) => {
                    console.warn(error);
                }).done();
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

    //跳转到新增活动界面
    gotoEducationAdd = () => {
        this.props.navigation.navigate('EducationAdd',{
            adminPhone: this.state.adminPhone
        })
    }

    //跳转到活动详情页
    showDetail(item) {
        this.props.navigation.navigate('EducationDetail',
            {
                id: item.id,
            });
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
    itemTextTitle: {
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

