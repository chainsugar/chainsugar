module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-nodemon');

  //gets run on server deployment
  grunt.registerTask('build', [

  ]);

  grunt.registerTask('default', ['nodemon:dev']);

};
