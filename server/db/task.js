var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  owner: String,   //user._id of creator of task
  information: Object,  //details of task (data from task creating form)
  applicants: [String], //array of user._id - who applied for task (bunnies)
  assignedTo: String,   //user._id of user selected by owner to perform task
});

module.exports = mongoose.model('Task', TaskSchema);
