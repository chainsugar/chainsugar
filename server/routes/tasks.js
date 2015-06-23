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
          res.status(500).end();
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
          res.status(500).end();
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
        res.status(500).end();
      } else {
        res.status(201).send(task);
      }
    });

  });

  //update information of one specific task.
  app.post('/api/tasks/:id', isAuthenticated, function(req, res){
    var taskId = req.params.id;
    var updatedInformation = req.body;
    //verify task exists and user is owner
    db.Task.findOne({_id:taskId}).exec(function(err, task){
      if(err) {
        res.status(500).end();
      } else {
        if(task == null) {
          res.status(404).end();
        } else {
          // owner can only update/edit task before anyone applies or is assigned
          if (task.owner !== req.user._id || task.assignedTo || task.applicants.length) {
            res.status(401).end();
          } else {
            task.information = updatedInformation;
            task.save(function(err){
              if(err){
                res.status(500).end();
              } else {
                res.status(200).end();
              }
            });
          }
        }
      }
    });

  });


  //get one specific task
  app.get('/api/tasks/:id', isAuthenticated, function(req, res){
    var taskId = req.params.id;
    db.Task.findOne({_id:taskId}).lean().exec(function(err, task){
      if(err) {
        return res.status(500).end();
      }
      if(task) {
        task.isOwner = task.owner === req.user._id;
        task.isAssignedToMe = task.assignedTo === req.user._id;
        task.appliedTo = _.contains(task.applicants, req.user._id);
        res.status(200).send(task);
      } else {
        res.status(404).end();
      }
    });
  });

  //delete a task which has not been assigned
  app.delete('/api/tasks/:id', isAuthenticated, function(req, res){
    var taskId = req.params.id;

    db.Task.remove({$and:[
      {_id:taskId},
      {owner: {$eq:req.user._id}},
      {assignedTo: {$eq:""}}
    ]}, function(err, task){
      if(err) {
        return res.status(500).end();
      }
      if(task) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    });

  });

  app.post('/api/task/assign', isAuthenticated, function(req, res){
    var taskId = req.body.task;
    var userId = req.body.user;
    //check task is valid, owned by user,
    //not yet assigned and and userId is an applicants
    db.Task.findOne({$and:[
      {_id:taskId},
      {owner: {$eq:req.user._id}},
      {assignedTo: {$eq:""}},
      {applicants: userId}
    ]},function(err, task){
      if(task){
        task.assignedTo = userId;
        task.save(function(){
          res.status(201).end();
        });
      } else {
        res.status(404).end();
      }
    });
  });

  app.post('/api/task/apply', isAuthenticated, function(req, res){
    var taskId = req.body.task;
    //Todo - prevent owner from applying and user applying more than once
    db.Task.findOne({$and:[
      {_id:taskId},
      {assignedTo: {$eq:""}}
    ]},function(err, task){
      if(task && !_.contains(task.applicants, req.user._id)){
        task.applicants.push(req.user._id);
        task.save(function(){
          res.status(201).end();
        });
      } else {
        res.status(404).end();
      }
    });
  });
}

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
}
