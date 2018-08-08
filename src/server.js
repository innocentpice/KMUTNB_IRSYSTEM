const _ = require('lodash');
const axios = require('axios');
const Async = require('async');
const moment = require('moment');
const momentTH = require('moment/locale/th');
const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyDj1z8MsO7vjl7W7_n5Bs0vy2EaNhEPpCg",
    authDomain: "kmutnb-project.firebaseapp.com",
    databaseURL: "https://kmutnb-project.firebaseio.com",
    projectId: "kmutnb-project",
    storageBucket: "kmutnb-project.appspot.com",
    messagingSenderId: "650380542261"
};
const firebaseApp = firebase.initializeApp(config);
let START = true;
let AUTORUN;
let NUMBER = 1;
let TIMETABLE = [];
let SENDED = false;

const feedDB = firebaseApp.database().ref('coursetable/bcom_ra/');

feedDB.on('value', snap => {
        TIMETABLE = _.map(snap.val(),key=>{
            return !key.info ? null : _.map(key.info,info=>{
                return [parseInt((info.start).slice(0,2)),info.text];
            });
        });
});

let day = moment().days()-1;
let hour = moment().hour()+7;
let subject = '';
let time = '';
const runEmail = () => {
    let result = false;
    let Today = TIMETABLE[day] ? TIMETABLE[day] : false;
    if(Today){
        Today.map(key=>{
            if((hour+1)===key[0]){
                subject = key[1];
                time = key[0];
                result = true;
                return true;
            }
        });
    }else{
        result = false;
    }
    if(result){
        const NowDay = moment().days()-1;
        const NowHour = moment().hour()+7;
        if(SENDED === false){
            SENDED = true;
            sendAllEmail(subject,(time+':00'));
            console.log('Email has sended on day: ',NowDay,', hour: ',NowHour,'[',subject,time,']');
        }
        if(day !== NowDay || hour !== NowHour){
            day = moment().days()-1;
            hour = moment().hour()+7;
            SENDED = false;
        }
    }
    
    
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(Delay());
        },2000);   
    });
}


const sendAllEmail = (subject,time) => {
    const URL = 'https://us-central1-kmutnb-project.cloudfunctions.net/';
    axios.get(URL+'sendEmailTable/', {
        params: {
          email:'picesija@gmail.com',
          displayName: 'Chanachai',
          subject,time
        }
    })
}


const Delay = () => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(runEmail());
        },1000);   
    });
}

const run = runEmail();