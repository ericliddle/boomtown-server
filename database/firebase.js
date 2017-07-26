import * as admin from "firebase-admin";

const serviceAccount = require("./firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://boomtown-27f3a.firebaseio.com"
});

export default admin;