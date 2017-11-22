import {
    AUTH_SIGNUP,
    AUTH_LOGIN
}
from './type';

import Cookies from 'universal-cookie';
import { firebaseApp } from '../firebase';

const cookies = new Cookies();

export const authSignup = (email, password, info,callback) => {
    return dispatch => {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                user.updateProfile({...info});
                const path = 'feedcard/' + user.uid + '/';
                firebaseApp.database().ref(path).push({});
                firebaseApp.database().ref('users/' + user.uid).update({ 'email': user.email,...info });
                authLogin(email, password);
            })
            .catch(error => {
                callback(error);
                dispatch({
                    type: AUTH_SIGNUP,
                    payload: { error }
                });
            })
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                cookies.set('auth', user, { path: '/' });
                dispatch({
                    type: AUTH_LOGIN,
                    payload: user
                });
            })
            .catch(error => {
                dispatch({
                    type: AUTH_LOGIN,
                    payload: { error: error.message }
                });
            })
    };
}

export const authLogout = () => {
    return dispatch => {
        firebaseApp.auth().signOut()
            .then(() => {
                cookies.remove('auth');
                dispatch({
                    type: AUTH_LOGIN,
                    payload: {}
                });
            })
            .catch(error => {
                dispatch({
                    type: AUTH_LOGIN,
                    payload: { error: error.message }
                });
            })
    };
}

export const authCheck = (callback) => {
    return dispatch => {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch({
                    type: AUTH_LOGIN,
                    payload: user
                });
                cookies.set('auth', user, { path: '/' });
                callback(true);
            }
            else {
                const auth = cookies.get('auth');
                if (auth) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            }
        });
    }
}
