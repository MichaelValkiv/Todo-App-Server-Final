const filename = '../data/todo_list.json';
const filename2 = './data/todo_list.json';
let todos = require(filename);
const helper = require('../helpers/helper.js');

const firebase = require('firebase-admin');
const serviceAccount = require('../todo-list-app-ba9d7-firebase-adminsdk-tlrrv-3717943956.json');
const firebaseToken = 'fqtRMhMRgR0:APA91bGk5jHMhWxk_8inU07H_A91igLt1Om_jIoqlYzOE4IoqLz6k6i9p7dcQuB2XPTEym_GiWjw30VY-8KnBhPRoOQ7XZe5r8GhWVKkuAkfT2gomCZHm7jFo5mDTiuh2FkwkSi6CI2X';
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://todo-list-app-ba9d7.firebaseio.com'
});

const options = {
    // priority: 'high',
    // timeToLive: 60,
};

function getTodos() {
    return new Promise((resolve, reject) => {
        if (todos.length === 0) {
            reject({
                message: 'no todos available',
                status: 202
            })
        }
        resolve(todos)
    })
}

function getTodo(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(todos, id)
            .then(todo => resolve(todo))
            .catch(err => reject(err))
    })
}

function insertTodo(newTodo) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(todos) };
        const date = {
            createdAt: helper.newDate(),
            updatedAt: helper.newDate(),
            deadline: helper.deadlineDate()
        };
        newTodo = { ...id, ...date, ...newTodo };
        todos.push(newTodo);
        helper.writeJSONFile(filename2, todos);
        resolve(newTodo);

        const payload = {
            notification: {
                title: newTodo.name,
                body: 'Must be done to ' + newTodo.deadline,
            }
        };

        let deadlineTime = newTodo.deadline;
        let currentTime = new Date();
        let timeToDo = deadlineTime.getTime() - currentTime.getTime();
        console.log(timeToDo);

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
        }, timeToDo);

        // firebase.messaging().sendToDevice(firebaseToken, payload, options);
        // firebase.messaging().send(payload);
    })
}

function updateTodo(id, newTodo) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(todos, id)
            .then(todo => {
                const index = todos.findIndex(p => p.id === todo.id);
                id = { id: todo.id };
                const date = {
                    createdAt: todo.createdAt,
                    updatedAt: helper.newDate(),
                    deadline: helper.deadlineDate()
                };
                todos[index] = { ...id, ...date, ...newTodo };
                helper.writeJSONFile(filename2, todos);
                resolve(todos[index])
            })
            .catch(err => reject(err))
    })
}

function deleteTodo(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(todos, id)
            .then(() => {
                todos = todos.filter(p => p.id != id);
                helper.writeJSONFile(filename2, todos);
                resolve()
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo
}