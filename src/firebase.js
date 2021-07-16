// ! Import firebase
import firebase from 'firebase'

// ! Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAdg7xXLjh_TnMPY4KI9TbxyWTsGSZMxBU",
  authDomain: "react-crud-32b92.firebaseapp.com",
  databaseURL: "https://react-crud-32b92-default-rtdb.firebaseio.com",
  projectId: "react-crud-32b92",
  storageBucket: "react-crud-32b92.appspot.com",
  messagingSenderId: "355884142746",
  appId: "1:355884142746:web:f51294c654319d6e348f23",
};
// ! Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

// ! Export
export default fireDB.database().ref();
