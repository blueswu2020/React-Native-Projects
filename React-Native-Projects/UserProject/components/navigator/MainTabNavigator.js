import React from 'react'
import {StyleSheet,Image} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsRootStack from './NewsStackNavigator';
import CommunityRootStack from './CommunityStackNavigator';
import FeedbackRootStack from './FeedbackRootStack';
import AlertRootStack from './AlertStackNavigator';

function renderIcon(tab,component){
    let iconSrc='';
    if (tab.focused){                       //标签激活状态下icon的路径
        iconSrc=component+'_highlighted';
    }else{                                  //未激活状态下的icon
        iconSrc='tabbar_'+component;
    }
    return <Image source={{uri:'asset:/TabBar/'+iconSrc+'.png'}} style={styles.buttonTabIconStyle} />
}

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
    return (
        //<NavigationContainer>
            <Tab.Navigator
                initialRouteName="NewsRoot"
                tabBarOptions={{
                    style: {                               //整体标签栏样式设置
                        height:60,
                        backgroundColor: '#91d6ff',
                    },
                    showIcon:true,
                    activeTintColor:'orange',
                }}
            >
                <Tab.Screen
                    name="NewsRoot"
                    component={NewsRootStack}
                    options={{
                        tabBarLabel: '首页',
                        tabBarIcon: (tab)=>renderIcon(tab,'home'),
                    }}
                />
                <Tab.Screen
                    name="CommunityRoot"
                    component={CommunityRootStack}
                    options={{
                        tabBarLabel: '附近',
                        tabBarIcon: (tab)=>renderIcon(tab,'discover'),
                    }}
                />
                <Tab.Screen
                    name="FeedbackRoot"
                    component={FeedbackRootStack}
                    options={{
                        tabBarLabel: '反馈',
                        tabBarIcon: (tab)=>renderIcon(tab,'message'),
                    }}
                />
                <Tab.Screen
                    name="AlertRoot"
                    component={AlertRootStack}
                    options={{
                        tabBarLabel: '警报',
                        tabBarIcon: (tab)=>renderIcon(tab,'alert'),
                    }}
                />
            </Tab.Navigator>
        //</NavigationContainer>
    );
}

const styles = StyleSheet.create({
    buttonTabIconStyle: {
        width: 30,
        height: 30
    }
})

export default MainTabNavigator
