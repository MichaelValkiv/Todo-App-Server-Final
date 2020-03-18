const firebase = require('firebase-admin');

const serviceAccount = require('./todo-list-app-ba9d7-firebase-adminsdk-tlrrv-3717943956.json');

const firebaseToken = 'fqtRMhMRgR0:APA91bGk5jHMhWxk_8inU07H_A91igLt1Om_jIoqlYzOE4IoqLz6k6i9p7dcQuB2XPTEym_GiWjw30VY-8KnBhPRoOQ7XZe5r8GhWVKkuAkfT2gomCZHm7jFo5mDTiuh2FkwkSi6CI2X';

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://todo-list-app-ba9d7.firebaseio.com'
});

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

setTimeout(() => {
    firebase.messaging().sendToDevice(firebaseToken, payload, options).then(
        (response) => {
            console.log('done:', response);
            console.log(response.results[0].error);
        },
        (error) => {
            console.log('error:', error);
        }
    );
}, 5000);
