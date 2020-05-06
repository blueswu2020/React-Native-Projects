/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    AppState
} from 'react-native';


export default class ReactNativeDemo extends Component {

    state = { appState: AppState.currentState };

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});
        console.log('nextAppState-----',nextAppState);
    };

    constructor(){
        super();
        const currentState = AppState.currentState;
        console.log('currentState-----',currentState);
    }

    render() {
        return (
            <View style={[styles.flex,styles.bgColor,styles.center]}>
                <Text>Current state is: {this.state.appState}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    bgColor: {
        backgroundColor: '#1FB9FF'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
