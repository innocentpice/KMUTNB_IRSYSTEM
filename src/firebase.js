import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDj1z8MsO7vjl7W7_n5Bs0vy2EaNhEPpCg",
    authDomain: "kmutnb-project.firebaseapp.com",
    databaseURL: "https://kmutnb-project.firebaseio.com",
    projectId: "kmutnb-project",
    storageBucket: "kmutnb-project.appspot.com",
    messagingSenderId: "650380542261"
};
export const firebaseApp = firebase.initializeApp(config);
