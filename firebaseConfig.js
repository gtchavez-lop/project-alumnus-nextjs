import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDvhthiIvEgqvbOiowg0m8ZFDp7Gl67Dao",
    authDomain: "project-alumnus-next.firebaseapp.com",
    projectId: "project-alumnus-next",
    storageBucket: "project-alumnus-next.appspot.com",
    messagingSenderId: "45473580507",
    appId: "1:45473580507:web:f1775d18a33a99c83313fe",
    measurementId: "G-B4ET09LCL4"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;