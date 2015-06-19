module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['client/app/components/**/*.js', 'client/app/shared/*.js'],
        dest: 'client/dist/app.js',
      },
    }

  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-concat');

  //gets run on server deployment
  grunt.registerTask('build', [
    'concat'
  ]);

  grunt.registerTask('default', ['nodemon:dev']);

};
