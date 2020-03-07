const filename = '../data/todo_list.json';
const filename2 = './data/todo_list.json';
let todos = require(filename);
const helper = require('../helpers/helper.js');

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
        resolve(newTodo)
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