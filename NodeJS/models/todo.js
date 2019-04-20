const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    title: { type: String },
    status: { type: Boolean }
});

var User = mongoose.model('User', {
    userName: { type: String },
    password: { type: String }
});

module.exports = { Todo, User };