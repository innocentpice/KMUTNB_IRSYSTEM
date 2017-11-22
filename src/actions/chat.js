import { 
    CHAT_SELECTROOM,
    CHAT_GETMESSAGES
} from './type';
import { firebaseApp } from '../firebase';

export const chatPush = (email,roomKey,msg) => {
    return dispatch => {
        const timestamp = Date.now();
        const newMessage = {
            msg: msg,
            timestamp: timestamp,
            by: email
        }
        const path2 = 'chatrooms/' + roomKey + '/messages/';
        const feedDB2 = firebaseApp.database().ref(path2);
        feedDB2.push(newMessage)
    };
}

export const chatSelect = (myKey, mateKey) => {
    
    const myUid = myKey[0];
    const myEmail = myKey[1];
    const mateUid = mateKey[0];
    const mateEmail = mateKey[1];
    
    return dispatch => {
        
        const newRoom = {
            roommate: [myEmail, mateEmail]
        }

        const feedDB1 = firebaseApp.database().ref('users/' + myUid + /chatroomlist/ + mateUid + '/roomkey/');
        feedDB1.on('value', snap => {
            const RoomKey = snap.val();
            
            if (RoomKey === null) {
                const feedDB1 = firebaseApp.database().ref('chatrooms/');
                feedDB1.push(newRoom).then(({ key }) => {
                    firebaseApp.database().ref('users/' +myUid + /chatroomlist/ + mateUid + '/').update({
                        roomkey: key,
                        roommate: mateEmail
                    });
                    firebaseApp.database().ref('users/' + mateUid + /chatroomlist/ +myUid + '/').update({
                        roomkey: key,
                        roommate: myEmail
                    });
                });
            }else{
                dispatch({
                    type: CHAT_SELECTROOM,
                    payload: RoomKey
                })
                const DBMSG = firebaseApp.database().ref('chatrooms/' + RoomKey + '/messages/');
                DBMSG.on('value', snap => {
                    dispatch({
                        type: CHAT_GETMESSAGES,
                        payload: snap.val()
                    })
                })
            }
        });
    };
}