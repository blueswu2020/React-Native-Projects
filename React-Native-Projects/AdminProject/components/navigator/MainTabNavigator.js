import React,{Component} from 'react'
import {StyleSheet,Image,View,Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserRootStack from './UserStackNavigator'
import CommunityRootStack from './CommunityStackNavigator';
import FeedbackRootStack from './FeedbackStackNavigator';
import AlertRootStack from './AlertStackNavigator';
import BadgeView from 'react-native-badge-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeContext,alertLength,feedbackLength} from './badgeCount';

function IconWithBadge({ src , name, badgeCount, color, size }) {
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
            <Ionicons  src={src} name={name} size={size} color={color} />
            {badgeCount > 0 && (
                <View
                    style={{
                        // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 6,
                        width: 12,
                        height: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
}

function HomeIconWithBadge(props) {
    // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
    return <IconWithBadge {...props} />;
}

const Tab = createBottomTabNavigator();

export default class MainTabNavigator extends Component {
    render() {
        return (
            //<NavigationContainer>
            <Tab.Navigator
                initialRouteName="UserRoot"
                tabBarOptions={{
                    style: {                               //整体标签栏样式设置
                        height:60,
                        backgroundColor: '#FFF',
                    },
                    showIcon:true,
                    // activeTintColor:'orange',
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'UserRoot') {
                            return (
                                <HomeIconWithBadge
                                    name={
                                        focused
                                            ? 'ios-home'
                                            : 'ios-home'
                                    }
                                    size={size}
                                    color={color}
                                    badgeCount={0}
                                />
                            );
                        }else if (route.name === 'CommunityRoot') {
                            return (
                                <HomeIconWithBadge
                                    name={
                                        focused
                                            ? 'ios-megaphone'
                                            : 'ios-megaphone'
                                    }
                                    size={size}
                                    color={color}
                                    badgeCount={0}
                                />
                            );
                        }else if (route.name === 'FeedbackRoot') {
                            return (
                                <ThemeContext.Consumer>
                                    {() => (
                                        <HomeIconWithBadge
                                            name={
                                                focused
                                                    ? 'ios-mail'
                                                    : 'ios-mail'
                                            }
                                            size={size}
                                            color={color}
                                            badgeCount={feedbackLength}
                                        />
                                    )}
                                </ThemeContext.Consumer>
                            );
                        }
                        else if (route.name === 'AlertRoot') {
                            return (
                                <ThemeContext.Consumer>
                                    {() => (
                                        <HomeIconWithBadge
                                            name={
                                                focused
                                                    ? 'ios-alert'
                                                    : 'ios-alert'
                                            }
                                            size={size}
                                            color={color}
                                            badgeCount={alertLength}
                                        />
                                    )}
                                </ThemeContext.Consumer>
                            );
                        }
                    },
                })}
            >
                <Tab.Screen
                    name="UserRoot"
                    component={UserRootStack}
                    options={{
                        tabBarLabel: '首页',
                        //tabBarIcon: (tab)=>renderIcon(tab,'home'),
                    }}
                />
                <Tab.Screen
                    name="CommunityRoot"
                    component={CommunityRootStack}
                    options={{
                        tabBarLabel: '公告',
                        //tabBarIcon: (tab)=>renderIcon(tab,'notice'),
                    }}
                />
                <Tab.Screen
                    name="FeedbackRoot"
                    component={FeedbackRootStack}
                    options={{
                        tabBarLabel: '反馈',
                        //tabBarIcon: (tab)=>renderIcon(tab,'message'),
                    }}
                />
                <Tab.Screen
                    name="AlertRoot"
                    component={AlertRootStack}
                    options={{
                        tabBarLabel: '急救',
                        //tabBarIcon: (tab)=>renderIcon(tab,'alert'),
                    }}

                />
            </Tab.Navigator>
            //</NavigationContainer>
        );
    }
}
// function MainTabNavigator() {
//     return (
//         //<NavigationContainer>
//             <Tab.Navigator
//                 initialRouteName="UserRoot"
//                 tabBarOptions={{
//                     style: {                               //整体标签栏样式设置
//                         height:60,
//                         backgroundColor: '#FFF',
//                     },
//                     showIcon:true,
//                     // activeTintColor:'orange',
//                     activeTintColor: 'tomato',
//                     inactiveTintColor: 'gray',
//                 }}
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ focused, color, size }) => {
//                         if (route.name === 'UserRoot') {
//                             return (
//                                 <HomeIconWithBadge
//                                     name={
//                                         focused
//                                             ? 'ios-home'
//                                             : 'ios-home'
//                                     }
//                                     size={size}
//                                     color={color}
//                                     badgeCount={0}
//                                 />
//                             );
//                         }else if (route.name === 'CommunityRoot') {
//                             return (
//                                 <HomeIconWithBadge
//                                     name={
//                                         focused
//                                             ? 'ios-megaphone'
//                                             : 'ios-megaphone'
//                                     }
//                                     size={size}
//                                     color={color}
//                                     badgeCount={0}
//                                 />
//                             );
//                         }else if (route.name === 'FeedbackRoot') {
//                             return (
//                                 <HomeIconWithBadge
//                                     name={
//                                         focused
//                                             ? 'ios-mail'
//                                             : 'ios-mail'
//                                     }
//                                     size={size}
//                                     color={color}
//                                     badgeCount={0}
//                                 />
//                             );
//                         }
//                         else if (route.name === 'AlertRoot') {
//                             return (
//                                 <ThemeContext.Provider >
//                                     <HomeIconWithBadge
//                                         name={
//                                             focused
//                                                 ? 'ios-alert'
//                                                 : 'ios-alert'
//                                         }
//                                         size={size}
//                                         color={color}
//                                         badgeCount={1}
//                                     />
//                                 </ThemeContext.Provider>
//
//                             );
//                         }
//                     },
//                 })}
//             >
//                 <Tab.Screen
//                     name="UserRoot"
//                     component={UserRootStack}
//                     options={{
//                         tabBarLabel: '首页',
//                         //tabBarIcon: (tab)=>renderIcon(tab,'home'),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="CommunityRoot"
//                     component={CommunityRootStack}
//                     options={{
//                         tabBarLabel: '公告',
//                         //tabBarIcon: (tab)=>renderIcon(tab,'notice'),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="FeedbackRoot"
//                     component={FeedbackRootStack}
//                     options={{
//                         tabBarLabel: '反馈',
//                         //tabBarIcon: (tab)=>renderIcon(tab,'message'),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="AlertRoot"
//                     component={AlertRootStack}
//                     options={{
//                         tabBarLabel: '急救',
//                         //tabBarIcon: (tab)=>renderIcon(tab,'alert'),
//                     }}
//
//                 />
//             </Tab.Navigator>
//         //</NavigationContainer>
//     );
// }

const styles = StyleSheet.create({
    buttonTabIconStyle: {
        width: 30,
        height: 30
    }
})

//export default MainTabNavigator;
