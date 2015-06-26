## Directory Layout

The application is split into two main directories `client` and `server`

## server/
Keep all server side code in `server/`

* `server.js` - express server setup and configuration
* `config.js` - environment variables for app configuration
* `email.js` -  util for sending email via SendGrid
* `notify.js` - util for sending notifications (via email)
* `routes/` - express middleware
* `views/` - ejs templates rendered by express
* `db/` - mongoose models

## client/
static content is served from this directory `client/`

* `app/` - Angular code and templates

Follows this guide for [structure](https://scotch.io/tutorials/angularjs-best-practices-directory-structure#a-better-structure-and-foundation)

and try to follow to this [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)

* `assets/` - static assets not related to Angular (css/images/js)

* `dist/` - build directory for minified and concated angular .js files, plus bower components
