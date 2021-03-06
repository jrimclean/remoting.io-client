'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib: {
				src: ['lib/**/*.js']
			},
			test: {
				src: ['test/**/*.js']
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			lib: {
				files: '<%= jshint.lib.src %>',
				tasks: ['jshint:lib']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test']
			}
		},
		browserify: {
			dev: {
				files: {
					'dist/remoting.io.js': ['lib/index.js']
				}
			},
			prod: {
				files: {
					'tmp/remoting.io.js': ['lib/index.js']
				},
				options: {
					transform: ['uglifyify']
				}
			}
		},
		uglify: {
			prod: {
				files: {
					'dist/remoting.io.min.js': 'tmp/remoting.io.js'
				}
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-karma');
	
	grunt.registerTask('default', ['jshint', 'browserify:dev', 'browserify:prod', 'uglify:prod']);
	grunt.registerTask('test', ['jshint', 'browserify:dev', 'karma:unit']);
};
