import firebase from "firebase-admin";
import { environment } from "../../environment";

export const connect = () => {
    const file = require("../../../firebase.json");

    firebase.initializeApp({
        credential: firebase.credential.cert(file),
        storageBucket: environment.bucketName
    })
}