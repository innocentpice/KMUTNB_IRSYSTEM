import {
    COURSE_GETALL
}
from './type';
import { firebaseApp } from '../firebase';
import _ from 'lodash';

import moment from 'moment';
import 'moment/locale/th';

export const getCourseAll = () =>{
    return dispatch => {
    const feedDB = firebaseApp.database().ref('coursetable/bcom_ra/');
        feedDB.on('value', snap => {
            dispatch({
                type: COURSE_GETALL,
                payload: [..._.map(snap.val(),(day)=>{
                    day.info = [..._.map(day.info,(info)=>{
                        return {...info};
                    })]
                    return {...day}
                })]
            });
        });
}}

export const deleteCourse = ({day,key},callback = () => {}) => {
    return dispatch => {
        const feedDB = firebaseApp.database();
        feedDB.ref('coursetable/bcom_ra/'+ day +'/info/' + key + '/').remove()
            .then(()=>{
                callback();
            });
    }
}

export const updateCourse = ({day,start,duration,text,key,color,maxduration},callback = ()=>{}) => {
    return dispatch => {
        const feedDB = firebaseApp.database();
        const course = {
                duration,
                text,
                start: moment().hour(start).format("HH:00"),
                end: moment().hour(start).add(duration,'h').format("HH:00"),
                props: {
                    style: {
                        backgroundColor: color,
                        textAlign: 'center'
                    }
                }
        };
        feedDB.ref('coursetable/bcom_ra/'+ day +'/info/' + key + '/').update(course)
            .then(()=>{
                callback();
            });
    }
}

export const addCourse = ({day,start,duration,text,color,maxduration},callback = ()=>{}) => {
    return dispatch => {
        const feedDB = firebaseApp.database();
        const course = {
                duration,
                text,
                start: moment().hour(start).format("HH:00"),
                end: moment().hour(start).add(duration,'h').format("HH:00"),
                props: {
                    style: {
                        backgroundColor: color,
                        textAlign: 'center'
                    }
                }
        };
        feedDB.ref('coursetable/bcom_ra/'+ day +'/info/').push(course)
            .then(({key})=>{
                feedDB.ref('coursetable/bcom_ra/'+ day +'/info/' + key + '/').update({key:key});
                callback();
            });
    }
}