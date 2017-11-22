import {
    USER_GETALL
}
from './type';
import { firebaseApp } from '../firebase';
import _ from 'lodash';

export const getUsers = (uid) =>{
    return dispatch => {
    const feedDB = firebaseApp.database().ref('users/');
        feedDB.on('value', snap => {
            dispatch({
                type: USER_GETALL,
                payload: _.map(snap.val(),(snap,key)=>{
                    return {key: key, text: snap.email, value: key};
                })
            });
        });
}}
