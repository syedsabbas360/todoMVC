const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todos = require('./todos')
const app = express();

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/todos');

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/static/index.html");
  res.json([{
      title: 'Wash my car',
      complete: false
    },
    {
      title: 'Eat lunch',
      complete: false
    }
  ])
})

app.post('/api/todos/', function(req, res) {
  var todo = new Todos()
  todo.title = req.body.title;
  todo.complete = req.body.complete;
  todo.save().then(function(todo) {
    res.json(todo)
  }).catch(function(err) {
    throw err
  })
})

app.get('/api/todos/:id', function(req, res) {

  Todos.findOne({
    _id: req.params.id
  }).then(function(todos) {
    res.json(todos)
  }).catch(function(err) {
    throw err
  })

})

app.put('/api/todos/:id', function(req, res){
  Todos.updateOne({
    _id: req.params.id
  }).then(function(todos) {
    res.json(todos)
  }).catch(function(err) {
    throw err
  })
})

app.patch('/api/todos/:id', function(req, res){
  Todos.findOne({
    complete: true,
    _id: req.params.id
  }).then(function(todos) {
    res.json(todos)
  }).catch(function(err) {
    throw err
  })
})

app.delete('/api/todos/:id', function(req, res){
  Todos.deleteOne({
    complete: true,
    _id: req.params.id
  }).then(function(todos) {
    res.json(todos)
  }).catch(function(err) {
    throw err
  })
})



app.listen(3000, function() {
  console.log('Express running on http://localhost:3000/.')
});
