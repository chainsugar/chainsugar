var db = require("./db");
var emailService = require("./email");
var config = require("./config");

module.exports.newApplication = function(taskId) {
  db.Task.findById(taskId)
    .populate('owner')
    .exec(function(err, task){
      if(!err) {
        var message = [
            'Hi ' + task.owner.name + ',\n\n',
            'A new person has applied for your task \n\n',
            task.information.name +'\n',
            config.SITE_ROOT + '/#/task/' + taskId +'\n\n',
            "Thanks for using TaskBunny."
          ].join("");

        emailService.send({
          from: 'noreply@taskbunny.com',
          to: task.owner.email,
          subject: 'New Applicant Notification from TaskBunny',
          text: message
        });
      }
    });
};

module.exports.taskAssigned = function(taskId) {
  db.Task.findById(taskId)
    .populate('assignedTo')
    .exec(function(err, task){
      if(!err) {
        var message = [
            'Hi ' + task.assignedTo.name + ',\n\n',
            'You have been assigned the task: \n\n',
            task.information.name + '\n',
            config.SITE_ROOT + '/#/task/' + taskId + '\n\n',
            'Thanks for using TaskBunny.'
          ].join("");

        emailService.send({
          from: 'noreply@taskbunny.com',
          to: task.assignedTo.email,
          subject: 'Task Assigned Notification from TaskBunny',
          text: message
        });
      }
    });
};
