// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTldktj3vCcEuaSFderrMuj7IhCJqpVA8",
  authDomain: "pemdesmekarjaya-838d9.firebaseapp.com",
  projectId: "pemdesmekarjaya-838d9",
  storageBucket: "pemdesmekarjaya-838d9.appspot.com",
  messagingSenderId: "1085475706334",
  appId: "1:1085475706334:web:d4d60854c082458e91b94f",
  measurementId: "G-Z549N846KY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
// const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore()

// collection ref
const colRef = collection(db, 'employee')

// get collection data
// getDocs(colRef)
//   .then(snapshot => {
//     // console.log(snapshot.docs)
//     let employee: any[] = []
//     snapshot.docs.forEach(doc => {
//       employee.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(employee)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

  // export default getDocs