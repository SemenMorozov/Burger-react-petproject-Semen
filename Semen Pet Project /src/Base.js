import Rebase from 're-base';
import firebase from 'firebase';
require('firebase/database')

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB72qzMtOwQu3BePDzi87-RVoX-QhU5IuM",
  authDomain: "very-hot-burger-2bc02.firebaseapp.com",
  databaseURL: "https://very-hot-burger-2bc02-default-rtdb.firebaseio.com",

});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;