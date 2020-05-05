import React from 'react';
import AlertScreen from '../view/main/alert/AlertList';
import FeedbackList from '../view/main/feedback/FeedbackList';

let alertScreen = new AlertScreen();
let feedbackList = new FeedbackList();
let feedbackLength = 0;
let alertLength = 0;
alertScreen.onGetAlert().then((alertList) => {
    alertLength = alertList.length;
    console.log("alertLength:"+alertList.length);
})

feedbackList.onGetFeedbacks().then((feedbackList) => {
    feedbackLength = feedbackList.length;
    console.log("feedbackLength:" + feedbackLength);
})

const ThemeContext = React.createContext({
    badgeCount: alertLength
});

//输出的context
export {alertLength,feedbackLength,ThemeContext};

