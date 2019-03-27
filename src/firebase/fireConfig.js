import firebase from 'firebase';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyA8V_ihIPLTgp3h9gtvjABNrXvZGH1t728",
    authDomain: "graduates-list.firebaseapp.com",
    databaseURL: "https://graduates-list.firebaseio.com",
    projectId: "graduates-list",
    storageBucket: "graduates-list.appspot.com",
    messagingSenderId: "339352692674"
};

export  function initFirebase() {
    // Initialize Firebase
   firebase.initializeApp(config);
}

export default initFirebase;