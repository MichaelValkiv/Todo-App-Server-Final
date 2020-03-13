const firebase = require('firebase-admin');

const serviceAccount = require('./todo-list-app.json');

const firebaseToken = '';

firebase.initializeApp({
   credential: firebase.credential.cert(serviceAccount),
   databaseURL: ''
});

const messaging = firebase.messaging();


const payload = {
    notification: {
        title: 'From Node.js server',
        body: 'Hello user!!!',
    }
};

const options = {
    priority: 'high',
    timeToLive: 60,
};

firebase.messaging().sendToDevice(firebaseToken, payload, options);