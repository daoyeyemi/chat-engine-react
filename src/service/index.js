import firebase from 'firebase/app'; // <-- This must be first
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

try {
  firebase.initializeApp({
    apiKey: "AIzaSyDzkmp_f4J0KNIdDzKTl5Rnwe-6emWgJRU",
    authDomain: "chat-demo-ae898.firebaseapp.com",
    // databaseURL: gs://chat-demo-ae898.appspot.com,
    projectId: "chat-demo-ae898",
    storageBucket: "chat-demo-ae898.appspot.com",
    messagingSenderId: "738616742899",
    appId: "1:738616742899:web:ec9ad888e0ffd20b2bf886"
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export const fb = {
  auth: firebase.auth(),
  storage: firebase.storage(),
  firestore: firebase.firestore(),
};
