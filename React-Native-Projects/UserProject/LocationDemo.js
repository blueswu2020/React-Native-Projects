import React,{Component} from 'react';
import { PermissionsAndroid,Text,View } from "react-native";
import { init, Geolocation,setNeedAddress  } from "react-native-amap-geolocation";

async function getLocation() {

    // 对于 Android 需要自行根据需要申请权限
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

    // 使用自己申请的高德 App Key 进行初始化
     await init({
         ios: "9bd6c82e77583020a73ef1af59d0c759",
         android: "8c397d6332bc4f51c6ff306a6ee3bfff"
    });

    Geolocation.getCurrentPosition(({ coords }) => {
        console.log(coords.longitude);
        console.log(coords.latitude);
    },({error}) => {
        console.log(error);
    },{
        //提高定位精度，但是会花费更长时间
        enableHighAccuracy:true,
        //超时设置
        timeout:3000,
    });
}

getLocation();

