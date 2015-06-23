var db = require("../db/");
var _ = require("underscore");

module.exports = function(app, express) {

  //return list of all tasks - exclude my tasks
  app.get('/api/tasks', isAuthenticated, function(req, res){
    //TODO: take a search query in request params to return
    //search results on 'description/name'
    db.Task.find({$and:[
        {owner: {$ne: req.user._id}},
        {assignedTo: {$ne: req.user._id}},
        {applicants: {$ne: req.user._id}}
      ]})
      .exec(function(err, tasks){
        if(err) {
          res.status(500);
        } else {
          res.status(200).send(tasks);
        }
      });
  });

  //return list of all user taks
  //wher user is owner, assigned to a task or is an applicant
  //adds additional boolean properties on each task
  //'isOwner', 'isAssignedToMe', 'appliedTo'
  app.get('/api/mytasks', isAuthenticated, function(req, res){
    db.Task.find({$or:[
        {owner: req.user._id},
        {assignedTo: req.user._id},
        {applicants: req.user._id}
      ]})
      .lean()
      .exec(function(err, tasks){
        if(err) {
          res.status(500);
        } else {
          tasks = _.map(tasks, function(task){
            task.isOwner = task.owner === req.user._id;
            task.isAssignedToMe = task.assignedTo === req.user._id;
            task.appliedTo = _.contains(task.applicants, req.user._id);
            return task;
          });
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
    db.Task.findOne({_id:taskId}).lean().exec(function(err, task){
      if(err) {
        res.status(500);
      } else {
        task.isOwner = task.owner === req.user._id;
        task.isAssignedToMe = task.assignedTo === req.user._id;
        task.appliedTo = _.contains(task.applicants, req.user._id);
        res.status(200).send(task);
      }
    });
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
