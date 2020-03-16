const firebase = require('firebase-admin');

const serviceAccount = require('./todo-list-app.json');

const firebaseToken = 'AAAARqoUJrw:APA91bGfowBw3zojJoZ45v0fmX9iUKuvlnsChWDUzdK4NsI7Koyds5eJPCodiKAAF_WVP3s8iX9ZkfhJ9L83Jy-VosI7HfMEfjaGHnHxitZdLM-iHqbQUTxmCRqkiqM1Uv4QOUqfW6g1';

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