var db = require("../db/");

module.exports = function(app, express) {

  //return list of all tasks
  app.get('/api/tasks', isAuthenticated, function(req, res){
    db.Task.find().exec(function(err, tasks){
      if(err) {
        res.status(500);
      } else {
        res.status(200).send(tasks);
      }
    });
  });

  //create new task
  app.post('/api/tasks', isAuthenticated, function(req, res){
    //TODO: do some input valiation on req.body
    db.Task.create({
      owner: req.user._id,
      information: req.body,
      applicants: [],
      assignedTo: ""
    }, function(err, task){
      if(err) {
        res.status(500);
      } else {
        res.send(task).status(201);
      }
    });

  });

  //update one specific task
  app.post('/api/tasks/:id', isAuthenticated, function(req, res){
    var taskId = req.params.id;
    res.end();
  });


  //get one specific task
  app.get('/api/tasks/:id', isAuthenticated, function(req, res){
    var taskId = req.params.id;
    res.end();
  });

  //delete a task
  app.delete('/api/tasks/:id', isAuthenticated, function(req, res){
    var taskId = req.params.id;
    res.end();
  });
}

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
}
