//require mongoose
const mongoose = require('mongoose');

//create Schema for todos
const todosSchema = new mongoose.Schema({
  title: {type: String},
  complete: {type: Boolean}
})

const todos = mongoose.model('todos', todosSchema);

//export your schema
module.exports = todos
