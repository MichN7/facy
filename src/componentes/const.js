import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCTc9yu5HwYxHGEYZxjRcPIsUPpZPJD0Zk",
    authDomain: "facy-7edfb.firebaseapp.com",
    databaseURL: "https://facy-7edfb.firebaseio.com",
    projectId: "facy-7edfb",
    storageBucket: "facy-7edfb.appspot.com",
    messagingSenderId: "674345202467"
  };
  firebase.initializeApp(config);


 var database = firebase.database();
