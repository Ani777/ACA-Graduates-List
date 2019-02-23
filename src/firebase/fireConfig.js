import firebase from 'firebase';
import 'firebase/firestore'


const config = {
    apiKey: "AIzaSyABwTokkW4fQhjSCurJJpp3S6HBCsB45IA",
    authDomain: "aca-graduate-s-list.firebaseapp.com",
    databaseURL: "https://aca-graduate-s-list.firebaseio.com",
    projectId: "aca-graduate-s-list",
    storageBucket: "aca-graduate-s-list.appspot.com",
    messagingSenderId: "361257217865"
};


export  function initFirebase() {
    // Initialize Firebase
    firebase.initializeApp(config);

    // Initialize Cloud Firestore through Firebase
    // firebase.firestore().settings({timestampsInSnapshots: true});
}

// export function createUserInfirebase(firstName, lastName, email, password) {
//     firebase.auth().createUserWithEmailAndPassword(firstName, lastName, email, password).catch(function(error) {
//         // Handle Errors here.
//         let errorCode = error.code;
//         let errorMessage = error.message;
//         // ...
//     });
// }
export default {initFirebase, createUserInfirebase}
