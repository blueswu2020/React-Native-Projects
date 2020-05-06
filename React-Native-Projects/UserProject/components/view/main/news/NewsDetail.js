import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {View,Text,Alert} from 'react-native';

export default class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailHtml: '',
            errorStatus: null,
        };

    }

    //组件渲染后调用
    componentDidMount() {
        this.getNewsDetail();
    }

    render() {
        return (
            <WebView
                source={{html: this.state.detailHtml, baseUrl: ''}}     //网页数据源
                automaticallyAdjustContentInsets={true}                 //web内容自适应
                javaScriptEnabled={true}                                //启用js
                domStorageEnabled={true}                                //允许本地dom存储
                startInLoadingState={true}                              //显示加载视图
            />
        );
    }

    getNewsDetail() {
        const {itemId} = this.props.route.params;         //获取新闻id
        const {itemTitle} = this.props.route.params;     //获取新闻标题
        //如果没有id说明找不到地址
        if(itemId === ''){
            this.setState({
                detailHtml: '<html>\n' +
                    '<head><title>404 Not Found</title></head>\n' +
                    '<body bgcolor="white">\n' +
                    '<center><h1>404 Not Found</h1></center>\n' +
                    '<hr><center>nginx</center>\n' +
                    '</body>\n' +
                    '</html>',
            })
            return;
        }
        this.props.navigation.setOptions({title: itemTitle}) //设置上标题栏
        let url = 'https://c.3g.163.com/nc/article/' + itemId + '/full.html';    //拼接新闻详情的url
        console.log(url);
        console.log(itemTitle);
        fetch(url,{
            method: 'get',
            headers: {
                'user-agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; QQWubi 133; SLCC2; .NET CLR 2.0.50727;' +
                    ' .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; CIBA; InfoPath.2)',
            },
        })
            .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    throw Error(`Request rejected with status ${response.status}`);
                }})
            .then((response) => response.json())
            .then((responseData) => {
                let detail = responseData[itemId];            //获取网页数据
                let imgArr = detail.img;                      //抽取数据中的图片数组
                let title = '<h2>' + detail.title + '</h2>';  //定制标题
                let rawHtml = detail.body;                    //抽取数据中的htmlbody内容
                imgArr.forEach((imgItem) => {                 //遍历图片数组将图片插入到body中
                    let imgHtml = '<img src="' + imgItem.src + '" width="100%">';
                    rawHtml = rawHtml.replace(imgItem.ref, imgHtml);
                });
                this.setState({
                    detailHtml: title + rawHtml + '<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />',//将拼接好的网页body保存到state中
                });
            })
            .catch((err) => {
                this.setState({
                    detailHtml: '<html>\n' +
                        '<head><title>403 Forbidden</title></head>\n' +
                        '<body bgcolor="white">\n' +
                        '<center><h1>403 Forbidden</h1></center>\n' +
                        '<hr><center>nginx</center>\n' +
                        '</body>\n' +
                        '</html>',
                })
                console.log(err);
            });
    }
}
