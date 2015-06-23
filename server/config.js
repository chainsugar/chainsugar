//store common environement config settings for the app

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/taskbunny',
};
