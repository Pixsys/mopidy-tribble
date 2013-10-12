"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    config : {
      'app' : 'app',
      'dest': 'public'
    },

    /*
     * Clear the {config.dest} directory
     */ 
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dest %>/*',
            '!<%= config.dest %>/.git*'
          ]
        }]
      }
    },
    
    /*
     * Jshint the {config.app}/js
     */ 
    jshint: {
      files: ['Gruntfile.js'],
      options: {
        // options here to override JSHint defaults
        globalstrict: true,

        globals: {
          require: true, // lol
          angular: true,
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    /*
     * Concat & Compress JS into {config.dest}/app dir
     */
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        files: {
          '<%= config.dest %>/js/main.min.js':  [
                                                  '<%= config.app %>/components/json3/json3.js',
                                                  '<%= config.app %>/components/jquery/jquery.js']
        }
      }
    },

    /* 
     * Concat & minify LESS files into {config.dest}/app dir
     */
    less: {
      build: {
        options: {
          yuicompress: true
        },
        files: {
          '<%= config.dest %>/css/main.min.css': [ 
                                                   '<%= config.app %>/components/bootstrap/less/bootstrap.less',
                                                   '<%= config.app %>/less/main.less' 
                                                 ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dest %>',
          src: [
            '{,*partials/}*.{ico,txt,html,htm}',
            '.htaccess',
            'images/{,*/}*.{jpg,jpeg,svg,gif,webp}',
            'styles/fonts/*',
            'js/*.js'
          ]
        }]
      }
    },
    watch: {
      // options: {
      //   livereload: true
      // },
      css: {
        files: ['<%= config.app %>/less/*.less'],
        tasks: ['less']
      },
      js: {
        files: ['<%= config.app %>/js/*.js'],
        tasks: ['build']
      },
      misc: {
        files: ['<%= config.app %>/*.{ico,txt,html,htm}',
                '<%= config.app %>/images/{,*/}*.{jpg,jpeg,svg,gif,webp}',
                '<%= config.app %>/styles/fonts/*'],
        tasks: ['build']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'clean', 'uglify', 'less', 'copy', 'watch']);
  grunt.registerTask('build', ['jshint', 'clean', 'uglify', 'less', 'copy']);

};