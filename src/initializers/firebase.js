import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

const app =  firebase.initializeApp({
    apiKey: "AIzaSyDrgbR-RRC1UIXAsnGtxuXpXnHI6aAflDI",
    authDomain: "login-auth-ce062.firebaseapp.com",
    projectId: "login-auth-ce062",
    storageBucket: "login-auth-ce062.appspot.com",
    messagingSenderId: "39213378182",
    appId: "1:39213378182:web:ce62f416a497c6b21ebf07"
});


/**
 * la autenticacion la pueda ultizar en cualquer parte de mi app, la exporto asi para que se importe con el mismo nombre auth
 * 
*/
export const auth = firebase.auth();
export default app;