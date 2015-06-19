var db = require("../db/");

module.exports = function(app, express) {

  //return list of all tasks
  app.get('/api/tasks', isAuthenticated, function(req, res){
    db.Task.find().exec(function(err, results){
      if(err) {
        res.status(500);
      } else {
        res.status(200).send(results);
      }
    });
  });

  //create new task
  //update existing task
  app.post('/api/tasks/:id', isAuthenticated, function(req, res){
    //TODO: do some input valiation on req.body
    var taskId = req.params.id;

    if(!taskId) {

      db.Task.create({
        owner: req.user._id,
        information: req.body,
        applicants: [],
        assignedTo: ""
      }).exec(function(err, task){
        if(err) {
          res.status(500).end();
        } else {
          res.status(201).send(task);
        }
      });

    } else {
      //update task with id taskId
      //verify that owner === user._id
    }

  });

  //delete a task
  app.delete('/api/tasks', isAuthenticated, function(req, res){

  });
}

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
}
