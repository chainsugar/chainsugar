//config settings for the app

if (process.env.NODE_ENV === 'production') {
  /** Production env **/

  //google app
  module.exports.GOOGLE_APP_ID = process.env.GOOGLE_APP_ID;
  module.exports.GOOGLE_APP_SECRET = process.env.GOOGLE_APP_SECRET;
  module.exports.GOOGLE_APP_CALLBACK_URL = process.env.GOOGLE_APP_CALLBACK_URL;

  //session key for signing session cookies
  module.exports.SESSION_SECRET = process.env.SESSION_SECRET;

  //mongo connection url
  module.exports.MONGODB_URL = process.env.MONGODB_URL;

} else {

  /** Development env **/
  try {
    var googleApp = require('../secrets/google.json');

    module.exports.GOOGLE_APP_ID = googleApp.id;
    module.exports.GOOGLE_APP_SECRET = googleApp.secret;
    module.exports.GOOGLE_APP_CALLBACK_URL = googleApp.url;

    module.exports.SESSION_SECRET = "w34587230598dflskjf";
    module.exports.MONGODB_URL = "mongodb://localhost/taskbunny";

  } catch(e) {
    console.error("== Warning == missing 'secrets/google.json' > see README");
    process.exit();
  }

}
