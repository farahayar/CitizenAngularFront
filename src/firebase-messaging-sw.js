importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
  firebase.initializeApp({
    apiKey: "AIzaSyDIQ6TNDi0xF3Pl4CpF_lNbjh7M4PnMsBE",
    authDomain: "citizen-dcb79.firebaseapp.com",
    databaseURL: "https://citizen-dcb79.firebaseio.com",
    projectId: "citizen-dcb79",
    storageBucket: "citizen-dcb79.appspot.com",
    messagingSenderId: "483503124464",
    appId: "1:483503124464:web:6b39540958b3609705f735",
    measurementId: "G-8EEXBSWEV4"
});
  const messaging = firebase.messaging();