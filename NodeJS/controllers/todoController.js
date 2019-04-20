const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Todo, User } = require('../models/todo');

// => localhost:3000/todo/
router.get('/todo', (req, res) => {
    Todo.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Todo :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/todo/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Todo.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Todo :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/todo', (req, res) => {
    var todo = new Todo({
        title: req.body.title,
        status: req.body.status
    });
    todo.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Todo Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/todo/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var todo = {
        title: req.body.title,
        status: req.body.status
    };
    Todo.findByIdAndUpdate(req.params.id, { $set: todo }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Todo Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/todo/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Todo.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Todo Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/login', (req, res) => {
    var user = new User({
        userName: req.body.userName,
        password: req.body.password
    });
    User.find({
        userName: req.body.userName,
        password: req.body.password
    }, (err, doc) => {
        if (!err) {
            if (doc.length > 0) {
                res.send({ data: doc[0], metadata: { status: 200 } });
            } else {
                res.send({ data: null, metadata: { status: 404 } })
            }
        }
        else { console.log('Error in Login :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/register', (req, res) => {
    var user = new User({
        userName: req.body.userName,
        password: req.body.password
    });
    user.save((err, doc) => {

        if (!err) {
            console.log(doc);
            res.send(doc);
        }
        else { console.log('Error in Register :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;