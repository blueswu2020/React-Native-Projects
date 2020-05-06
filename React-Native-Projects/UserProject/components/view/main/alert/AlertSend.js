import React, {useState, useEffect, Component} from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
} from 'react-native';

//获取屏宽
const DevWidth=Dimensions.get('window').width;

export default  class AlertSend extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>求救信息已发出,等待管理员处理</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        marginTop: 20,
        fontSize: 20,
    },
})
