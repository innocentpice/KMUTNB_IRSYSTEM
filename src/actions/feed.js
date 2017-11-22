import {
    FEED_UPDATE,
    FEED_DELETE,
    FEED_CHECK,
    FEED_EMPTY
}
from './type';
import { firebaseApp } from '../firebase';
import _ from 'lodash';

export const feedGetAll = (uid) => {
    
    function fetchFeed(dispatch,ref,child,key){
        child.forEach(index=>{
            ref.child(index).on('value' , snap => {
                let item = {[index]: snap.val()};
                item.key = key;
                dispatch({
                    type: FEED_UPDATE,
                    payload: item
                });
            });
        });
    }
    
    return dispatch => {
        const feedDB = firebaseApp.database().ref('users/'+uid+'/feedcard');
        feedDB.on('value', snap => {
            
            if(snap.val() === null){
                dispatch({
                    type: FEED_EMPTY,
                    payload: {empty: 'true'}
                });
                return false;
            }
            
            dispatch({
                type: FEED_CHECK,
                payload: snap.val()
            });
            
            snap.val() && _.map(snap.val(),(snap,key)=>{
                const ref = firebaseApp.database().ref('feedcard/' + key + '/')
                    
                    ref.on('value' , snap => {
                        if(!snap.val()){
                            dispatch({
                                type: FEED_DELETE,
                                payload: snap.key
                            });                            
                        }
                    });
                    
                    const child = ['description','header','poster','timestamp','deadline','sendTo','acceptor'];
                    fetchFeed(dispatch,ref,child,key);
                    
            });
        });
    };
}

export const feedDelete = (uid,key) => {
    return dispatch => {
        const feedDB = firebaseApp.database().ref('feedcard/');
        feedDB.child(key.key).remove()
            .then(() => {
                firebaseApp.database().ref('users/' + uid + '/feedcard/').child(key.key).remove()
                var i;
                if(key.sendTo){
                    for (i = 0; i < key.sendTo.length; i++) {
                        firebaseApp.database().ref('users/' + key.sendTo[i] + '/feedcard/').child(key.key).remove()
                    }
                }
            });
    };
}

export const feedAdd = (newFeed,uid,callback=()=>{}) => {
    function SendKey(feedKey,sendTo){
        firebaseApp.database().ref('users/' + uid + '/feedcard/' + feedKey + '/').update({ feedKey });
        
        sendTo && sendTo.map(key=>{
            const MyFeedDB = firebaseApp.database().ref('users/' + key + '/feedcard/' + feedKey + '/');
            MyFeedDB.update({ feedKey });
            return true;
        });
        callback();
    }
    
    return dispatch => {
        const feedDB = firebaseApp.database().ref('feedcard/');
        feedDB.push(newFeed).then((snap) => {
            SendKey(snap.key,newFeed.sendTo);
        })
    };
}

export const feedAccept = (uid,feedkey) => {
    return dispatch => {
        const MyFeedDB = firebaseApp.database().ref('feedcard/' + feedkey + '/acceptor/' + uid + '/');
        MyFeedDB.update({accepted: true});
    };
}


export const feedUpdate  = (feed,uid,callback=()=>{}) => {
    
    const {header, description, deadline, sendTo=[], oldSendTo=[] } = feed;
    const newFeed = { header, description, sendTo, deadline };
    
    function SendKey(feedKey,add=[],remove=[]){
        add && add.map(key=>{
            const MyFeedDB = firebaseApp.database().ref('users/' + key + '/feedcard/' + feedKey + '/');
            MyFeedDB.update({ feedKey });
            return true;
        });
        
        remove && remove.map(key=>{
            const MyFeedDB = firebaseApp.database().ref('users/' + key + '/feedcard/' + feedKey + '/');
            MyFeedDB.remove();
            const MyFeedDBAC = firebaseApp.database().ref('/feedcard/' + feedKey + '/acceptor/'+ key +'/');
            MyFeedDBAC.remove();
            return true;
        });
        
        callback();
    }
    
    return dispatch => {
        const feedDB = firebaseApp.database().ref('feedcard/'+ feed.key + '/');
        feedDB.update(newFeed).then((snap) => {
           
            let Add= [];
            let Remove = [];
            
            sendTo && sendTo.map(key=>{
                let boo = _.find(oldSendTo, function(o) { 
                    return o===key
                })
                if(!boo){
                    Add.push(key);
                }
                return true;
            });
            
            oldSendTo && oldSendTo.map(key=>{
                let boo = _.find(sendTo, function(o) { 
                    return o===key
                })
                if(!boo){
                    Remove.push(key);
                }
                return true;
            });
            
            SendKey(feed.key,Add,Remove);
        })
    };
}

