import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAT2F5ALdIqPSmc1oWadkOyxTbLZhAdHEc",
    authDomain: "freelancer-world.firebaseapp.com",
    databaseURL: "https://freelancer-world.firebaseio.com",
    projectId: "freelancer-world",
    storageBucket: "freelancer-world.appspot.com",
    messagingSenderId: "584873749915"
  };
  firebase.initializeApp(config);

  export default firebase;