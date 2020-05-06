import LoginScreen from './components/navigator/LoginStackNavigator'
//import LocationDemo from './LocationDemo';
import React, {Component} from 'react';
import {
    View,
} from 'react-native';

export default class  App extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{flex:1}}>
                <LoginScreen/>
                {/*<LocationDemo/>*/}
            </View>
        );
    }
}



