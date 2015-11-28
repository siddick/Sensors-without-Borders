'use strict'

module.exports = function watch(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Options
	return {
			options: {
      	livereload: true,
    	},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile'],
			},
			src: {
				files: ['lib/*.js', 'public/css', 'public/js/*.js'],
				tasks: ['default'],
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit'],
			},
		}
};
