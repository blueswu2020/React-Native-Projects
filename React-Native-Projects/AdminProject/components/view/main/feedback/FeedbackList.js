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

export default class FeedbackList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            feedbackList: [], //反馈列表
            renderList: [], //渲染列表
            adminPhone:null,
        };
    }

    //接受管理员手机号
    UNSAFE_componentWillMount() {
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
        this.onGetFeedbacks()
    }

    render() {
        return (
            <View style={styles.container}>
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

    //根据管理员手机号获取反馈列表
    onGetFeedbacks = () => {
        return new Promise((resolve, reject) => {
            //获取数据
            storage.load({
                key: 'user',
                id: '1'
            }).then(ret => {
                // 如果找到数据，则在then方法中返回
                fetch('http://192.168.1.3:3000/feedbackUserInfo/' + ret ,{  //获取该管理员的反馈列表
                    method: 'GET'
                }).then((response) => {
                    return response.json();
                }).then((jsonData) => {
                    this.setState({
                        feedbackList: jsonData,
                        renderList: jsonData,
                    })
                    resolve(jsonData);
                })
                    .catch((error) => {
                        console.warn(error);
                        reject(error);
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

    // 输入内容
    onChangeText = (text) => {
        this.setState({
            text,
            renderList: this.filterText(text)
        })
    }

    // 关键词过滤
    filterText = (text) => {
        let data = this.state.feedbackList
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
                    <Text style={styles.itemTextName}>手机号：{item.item.userPhone}</Text>
                    <Text style={styles.itemTextOther}>反馈时间：{item.item.time}</Text>
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
        this.onGetFeedbacks(); //获取用户列表
        this.setState({refreshing: false});              //停止刷新
    }

    //跳转到反馈详情页
    showDetail(item) {
        this.props.navigation.navigate('FeedbackDetail',
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
        backgroundColor: '#91d6ff',
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

