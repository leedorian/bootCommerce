module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';



    var fs = require('fs');
    var path = require('path');
    //var npmShrinkwrap = require('npm-shrinkwrap');
    //var generateGlyphiconsData = require('./grunt/bs-glyphicons-data-generator.js');
    /*var BsLessdocParser = require('./grunt/bs-lessdoc-parser.js');
    var getLessVarsData = function () {
      var filePath = path.join(__dirname, 'less/variables.less');
      var fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
      var parser = new BsLessdocParser(fileContent);
      return { sections: parser.parseFile() };
    };
    var generateRawFiles = require('./grunt/bs-raw-files-generator.js');
    var generateCommonJSModule = require('./grunt/bs-commonjs-generator.js');*/
    var configBridge = grunt.file.readJSON('./grunt/configBridge.json', {
        encoding: 'utf8'
    });

    Object.keys(configBridge.paths).forEach(function (key) {
        configBridge.paths[key].forEach(function (val, i, arr) {
            arr[i] = path.join('./docs/assets', val);
        });
    });

    //get all html from blocks folder

    function getAllHtmlFromBlocks() {
        var path = "./blocks";
        var filesNameArr = [];
        var files = fs.readdirSync(path);
        for (var i = 0; i < files.length; i++) {
            if (files[i].indexOf(".html") > -1) {
                filesNameArr.push(files[i].slice(0, -5));
            }
        }
        return filesNameArr;
    }
    var fileNames = getAllHtmlFromBlocks();

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * bootCommerce v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        //jqueryCheck: configBridge.config.jqueryCheck.join('\n'),
        //jqueryVersionCheck: configBridge.config.jqueryVersionCheck.join('\n'),
        // http server
        'http-server': {
            'dev': {
                // the server root directory
                root: "./",
                port: 8282,
                // port: function() { return 8282; }
                host: "127.0.0.1",
                cache: 100000,
                showDir: true,
                autoIndex: true,
                // server default file extension
                ext: "html",
                // run in parallel with other tasks
                runInBackground: false
            }
        },

        // Task configuration.
        clean: {
            blocks: 'blocks/dist',
            pages: 'pages/dist'
        },
        /*
           jshint: {
             options: {
               jshintrc: 'js/.jshintrc'
             },
             grunt: {
               options: {
                 jshintrc: 'grunt/.jshintrc'
               },
               src: ['Gruntfile.js', 'grunt/*.js']
             },
             core: {
               src: 'js/*.js'
             },
             test: {
               options: {
                 jshintrc: 'js/tests/unit/.jshintrc'
               },
               src: 'js/tests/unit/*.js'
             },
             assets: {
               src: ['docs/assets/js/src/*.js', 'docs/assets/js/*.js', '!docs/assets/js/*.min.js']
             }
           },

           jscs: {
             options: {
               config: 'js/.jscsrc'
             },
             grunt: {
               src: '<%= jshint.grunt.src %>'
             },
             core: {
               src: '<%= jshint.core.src %>'
             },
             test: {
               src: '<%= jshint.test.src %>'
             },
             assets: {
               options: {
                 requireCamelCaseOrUpperCaseIdentifiers: null
               },
               src: '<%= jshint.assets.src %>'
             }
           },

           concat: {
             options: {
               //banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
               banner: '<%= banner %>',
               stripBanners: false
             },
             bootstrap: {
               src: [
                 'js/transition.js',
                 'js/alert.js',
                 'js/button.js',
                 'js/carousel.js',
                 'js/collapse.js',
                 'js/dropdown.js',
                 'js/modal.js',
                 'js/tooltip.js',
                 'js/popover.js',
                 'js/scrollspy.js',
                 'js/tab.js',
                 'js/affix.js'
               ],
               dest: 'dist/js/<%= pkg.name %>.js'
             }
           },

           uglify: {
             options: {
               preserveComments: 'some'
             },
             core: {
               src: '<%= concat.bootstrap.dest %>',
               dest: 'dist/js/<%= pkg.name %>.min.js'
             },
             customize: {
               src: configBridge.paths.customizerJs,
               dest: 'docs/assets/js/customize.min.js'
             },
             docsJs: {
               src: configBridge.paths.docsJs,
               dest: 'docs/assets/js/docs.min.js'
             }
           },

           qunit: {
             options: {
               inject: 'js/tests/unit/phantom.js'
             },
             files: 'js/tests/index.html'
           },*/

        // TODO validate html blocks
        jshint: {
            options: {
                jshintrc: 'blocks/js/.jshintrc',
                force: true

            },
            blocks: {
                src: "blocks/js/*.js"
            },
            pages: {
                src: "pages/js/*.js"
            }
        },
        jscs: {
            options: {
                config: 'blocks/js/.jscsrc',
                force: true
            },
            blocks: {
                src: '<%= jshint.blocks.src %>'
            },
            pages: {
                src: '<%= jshint.pages.src %>'
            }
        },
        uglify: {
            options: {
                preserveComments: 'some',
                banner: '<%= banner %>',
                sourceMap: false
            },
            blocks: {
                src: 'blocks/dist/js/<%= pkg.name %>.js',
                dest: 'blocks/dist/js/<%= pkg.name %>.min.js'
            },
            pages: {
                expand: true,
                cwd: 'pages/js/',
                src: ['*.js'],
                dest: 'pages/dist/js/',
                ext: '.min.js',
                extDot: 'first'
           }
        },

        less: {
            compileBlock: {
                options: {
                    sourceMap: false
                },
                files: [
                    {
                        expand: true, // Enable dynamic expansion.
                        cwd: 'blocks/less/', // Src matches are relative to this path.
                        src: ['**/*.less'], // Actual pattern(s) to match.
                        dest: 'blocks/dist/css/', // Destination path prefix.
                        ext: '.css', // Dest filepaths will have this extension.
                        extDot: 'first' // Extensions in filenames begin after the first dot
            },
        ]
            },
            compilePage: {
                options: {
                    sourceMap: false,
                },
                files: [
                    {
                        expand: true, // Enable dynamic expansion.
                        cwd: 'pages/less/', // Src matches are relative to this path.
                        src: ['**/*.less'], // Actual pattern(s) to match.
                        dest: 'pages/dist/css/', // Destination path prefix.
                        ext: '.css', // Dest filepaths will have this extension.
                        extDot: 'first' // Extensions in filenames begin after the first dot
            },
        ]
            }
        },

        autoprefixer: {
            options: {
                browsers: configBridge.config.autoprefixerBrowsers
            },
            blocks: {
                options: {
                    //map: true
                },
                src: 'blocks/dist/css/**/*.css'
            },
            pages: {
                options: {
                    //map: true
                },
                src: 'pages/dist/css/**/*.css'
            }
        },

        csslint: {
            options: {
                csslintrc: 'blocks/less/.csslintrc'
            },
            blocks: {
                expand: true,
                cwd: 'blocks/dist/css/',
                src: ['*.css', '!*.min.css', '!bootCommerce.css'],
                dest: 'blocks/dist/css/'
            },
            pages: {
                expand: true,
                cwd: 'pages/dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'pages/dist/css/'
            }
        },

        usebanner: {
            options: {
                position: 'top',
                banner: '<%= banner %>'
            },
            src: ['blocks/dist/css/**/*.css', 'pages/dist/css/**/*.css']
        },
        csscomb: {
            options: {
                config: 'blocksless/.csscomb.json'
            },
            blocks: {
                expand: true,
                cwd: 'blocks/dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'blocks/dist/css/'
            },
            pages: {
                expand: true,
                cwd: 'pages/dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'pages/dist/css/'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            minifyBlocks: {
                src: 'blocks/dist/css/<%= pkg.name %>.css',
                dest: 'blocks/dist/css/<%= pkg.name %>.min.css'
            }
        },
        concat: {
            option: {},
            css: {
                src: 'blocks/dist/css/*.css',
                dest: 'pages/dist/css/<%= pkg.name %>.css'
            },
            js: {
                src: ['blocks/js/*.js', '!blocks/js/bootCommerceBase.js'],
                dest: 'blocks/dist/js/<%= pkg.name %>.js'
            },
            js_base: {
                src: ['blocks/js/bootCommerceBase.js', 'blocks/dist/js/<%= pkg.name %>.js'],
                dest: 'blocks/dist/js/<%= pkg.name %>.js'
            }
        },
        processhtml: {
            pages: {
                options: {
                    process: true,
                    data: {
                        message: 'This is development environment',
                        list: fileNames //get from blocks folder
                    }
                },
                files: [
                    {
                        expand: true, // Enable dynamic expansion.
                        cwd: 'pages/', // Src matches are relative to this path.
                        src: ['*.html'], // Actual pattern(s) to match.
                        dest: 'pages/dist/', // Destination path prefix.
                        ext: '.html', // Dest filepaths will have this extension.
                        extDot: 'first' // Extensions in filenames begin after the first dot
                }
            ]
            },
            blocks: {
                options: {
                    process: true
                },
                files: [
                    {
                        expand: true, // Enable dynamic expansion.
                        cwd: 'blocks/', // Src matches are relative to this path.
                        src: ['*.html'], // Actual pattern(s) to match.
                        dest: 'blocks/dist/', // Destination path prefix.
                        ext: '.html', // Dest filepaths will have this extension.
                        extDot: 'first' // Extensions in filenames begin after the first dot
                }
            ]
            }
        },
        htmlhintplus: {
            //htmlhintrc: "path/to/file"
            //use default rules
            //TODO hint includes and blocks html
            html: {
                src: ['pages/dist/home.html']
            }
        },
        watch: {
            less: {
                files: ['blocks/less/**/*.less', 'pages/less/**/*.less'],
                tasks: ['dist-css', 'dist-pages']
            },
            pages: {
                files: ['blocks/*.html', 'pages/*.html', 'pages/includes/**/*.html'],
                tasks: ['processhtml:blocks','processhtml:pages']
            }
        }

    });


    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });
    require('time-grunt')(grunt);
    /*
      // Docs HTML validation task
      grunt.registerTask('validate-html', ['jekyll:docs', 'validation']);

    */

    // JS distribution task.
    grunt.registerTask('dist-js', ['jshint:blocks', 'jshint:pages', 'jscs', 'concat:js', 'concat:js_base', 'uglify']);

    // CSS distribution task.
    grunt.registerTask('less-compile', ['less:compileBlock', 'less:compilePage']);
    grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:blocks', 'autoprefixer:pages', 'csscomb:blocks', 'csscomb:pages', 'csslint:blocks', 'csslint:pages', 'cssmin:minifyBlocks', 'usebanner']);
    grunt.registerTask('dist-pages', ['processhtml:blocks','processhtml:pages', 'htmlhintplus']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-pages', 'dist-js']);
    //http server task.
    grunt.registerTask('server', ['http-server']);
    // default task
    grunt.registerTask('default', ['clean', 'dist', 'server']);

};
