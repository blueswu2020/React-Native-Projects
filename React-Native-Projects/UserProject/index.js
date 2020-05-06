import { YellowBox,AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'
//console.ignoredYellowBox = ['Remote debugger'];
console.disableYellowBox = true
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated in plain JavaScript React classes.']);

AppRegistry.registerComponent(appName,() => App);
