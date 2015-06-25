var config = require("./config");

//https://azure.microsoft.com/en-us/documentation/articles/store-sendgrid-nodejs-how-to-send-email/

var sendGridUsername = config.SENDGRID_USERNAME;
var sendGridPassword = config.SENDGRID_PASSWORD;

if (sendGridUsername && sendGridPassword) {

  var sendgrid = require('sendgrid')(sendGridUsername, sendGridPassword);

  module.exports.send = function(opt, callback) {

    var email = new sendgrid.Email(opt);
    sendgrid.send(email, callback);

  };

  module.exports.sendTestEmail = function(to, callback) {

    var email = new sendgrid.Email({
      to: to,
      from: "noreply@taskbunny.com",
      subject: "test message from taskbunny",
      text: "This is a test from TaskBunny"
    });

    sendgrid.send(email, callback);
  };

} else {

  module.exports.send = function(opt, callback) {
    if(!callback) return;

    process.nextTick(function(){
      callback();
    });
  };

}
