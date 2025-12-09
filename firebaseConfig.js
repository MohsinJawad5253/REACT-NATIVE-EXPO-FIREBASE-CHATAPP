// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHpdikx8tDbIQwNvJuI3aVENZxDvMhHXQ",
  authDomain: "fir-chat-63f6f.firebaseapp.com",
  projectId: "fir-chat-63f6f",
  storageBucket: "fir-chat-63f6f.firebasestorage.app",
  messagingSenderId: "320410818846",
  appId: "1:320410818846:web:9921a5958b65c2cb93910f",
  measurementId: "G-7FRYY8D9VL"
};


const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
});

export const db=getFirestore(app)

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');