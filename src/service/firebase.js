import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

try {
    firebase.initializeApp({
        apiKey: "AIzaSyBtytpZSqmRXKh7TvSA9GEKbDaK4hRNQCU",
        authDomain: "chat-react-app-b84e1.firebaseapp.com", 
        projectId: "chat-react-app-b84e1", 
        storageBucket: "chat-react-app-b84e1.appspot.com", 
        messagingSenderId: "513552426295", 
        appId: "1:513552426295:web:aac5bacab508c8e4a626b2" 
    });
} catch (error) {
    if (!/already exists/u.test(error.message)) {
        console.error("Firebase admin initialization error", error.stack)
    }
}

export const fb = {
    auth: firebase.auth(),
    storage: firebase.storage(),
    firestore: firebase.firestore()
};