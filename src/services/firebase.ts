import firebase from 'firebase/app'

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey:"AIzaSyD3ECv_M5diE9NAWHcqlg1hZ4NF5swHe9Y",
    authDomain:"letmeask-76d18.firebaseapp.com",
    databaseURL:"https://letmeask-76d18-default-rtdb.firebaseio.com",
    projectId:"letmeask-76d18",
    storageBucket:"letmeask-76d18.appspot.com",
    messagingSenderId:"919092055398",
    appId:"1:919092055398:web:3b4c5130c5bb6aca7b8ca7"
  };

  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }