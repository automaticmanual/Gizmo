var ConfigLoader = require('grunt-config-loader');

var gruntFile = function(grunt) {
  var configLoader = new ConfigLoader(grunt, {
    cwd: 'tasks/config'
  });

  configLoader.loadAll();

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-mustache-render');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('build-tests', require('./tasks/helpers/super-glob.js')(grunt, 'test-builder'));
  grunt.registerTask('test', ['build-tests', 'connect:test', 'mocha_phantomjs']);
  grunt.registerTask('doc', ['mustache_render:jsdoc-config', 'jsdoc']);
  grunt.registerTask('build', ['jshint', 'test', 'requirejs',  'doc']);
  grunt.registerTask('dev', ['connect:dev']);

  grunt.registerTask('default', ['build']);
};

module.exports = gruntFile;