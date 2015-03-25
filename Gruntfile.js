module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    var fs = require('fs');
    var path = require('path');
    var configBridge = grunt.file.readJSON('./grunt/configBridge.json', {
        encoding: 'utf8'
    });

    Object.keys(configBridge.paths).forEach(function (key) {
        configBridge.paths[key].forEach(function (val, i, arr) {
            arr[i] = path.join('./docs/assets', val);
        });
    });

    //all blocks
    var fileNames = [
        ["basket_empty.html", "Empty basket"],
        ["basket_hasItem.html", "Basket with items"],
        ["bread_crumbs.html", "Bread crumbs"],
        ["carousel_product_crosswise.html", "Horizontal products carousel"],
        ["carousel_product_vertical.html", "Vertical products carousel"],
        ["carousel_slide.html", "Slide show"],
        ["footer.html", "Footer of site"],
        ["signin_register.html", "Sign in & register"],
        ["registration.html", "Registration"],
        ["header.html", "Header of site"],
        ["mini_basket.html", "Mini basket"],
        ["navigation.html", "Site navigation"],
        ["orderSummary.html", "Summary text"],
        ["pagination.html", "Pagination"],
        ["product_filter_checkbox.html", "Product filter checklist"],
        ["product_filter_removable.html", "Product filter removeable"],
        ["image_viewer.html", "Image viewer"],
        ["product-list-horizontal.html", "Products list view"],
        ["product-list-vertical.html", "Products thumbnail view"],
        ["product-option.html", "Product swatch"],
        ["promotionalCode.html", "Promotional code"],
        ["quick_info.html", "Quick info box"],
        ["search.html", "Product search"],
        ["store_locator.html", "Store locator"],
        ["store_locator_detail.html", "Store locator detail"],
        ["product_infos_tab.html", "Product infos tab"]
    ];
    fileNames = fileNames.sort(function (x, y) {
        return x[1].localeCompare(y[1]);
    });
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
        /*'http-server': {
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
        },*/

        // Task configuration.
        clean: {
            blocks: 'blocks/dist',
            pages: 'pages/dist'
        },
        /*
           qunit: {
             options: {
               inject: 'js/tests/unit/phantom.js'
             },
             files: 'js/tests/index.html'
           },*/

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
            //use default rules
            //TODO hint includes and blocks html
            options: {
                htmlhintrc: "blocks/.htmlhintrc",
                force: true
            },
            html: {
                src: ['pages/*.html', 'pages/includes/*.html', 'blocks/*.html']
            }
        },
        watch: {
            less: {
                files: ['blocks/less/**/*.less', 'pages/less/**/*.less'],
                tasks: ['dist-css']
            },
            js: {
                files: ['blocks/js/*.js', 'pages/js/*.js'],
                tasks: ['dist-js']
            },
            html: {
                files: ['blocks/*.html','pages/*.html', 'pages/includes/**/*.html'],
                tasks: ['processhtml:blocks','processhtml:pages']
            }
        },
        browserSync: {
            bsFiles: {
                src: [
                    'blocks/dist/**/*.*',
                    'pages/dist/**/*.*'
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: [
                        "pages/dist",
                        "./"
                    ]
                },
                port: 7272,
                host: "127.0.0.1",
                reloadDelay: 2000,
                reloadOnRestart: false,
                browser: ["chrome", "firefox"]
            }
        }

    });


    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });
    require('time-grunt')(grunt);

    // JS distribution task.
    grunt.registerTask('dist-js', ['jshint:blocks', 'jshint:pages', 'jscs', 'concat:js', 'concat:js_base', 'uglify']);

    // CSS distribution task.
    grunt.registerTask('less-compile', ['less:compileBlock', 'less:compilePage']);
    grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:blocks', 'autoprefixer:pages', 'csscomb:blocks', 'csscomb:pages', 'csslint:blocks', 'csslint:pages', 'cssmin:minifyBlocks', 'usebanner']);
    grunt.registerTask('dist-pages', ['htmlhintplus', 'processhtml:blocks', 'processhtml:pages']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-pages', 'dist-js']);

    // default task
    //grunt.registerTask('default', ['clean', 'dist', 'server']);
    grunt.registerTask('default', ['clean', 'dist', 'browserSync', 'watch']);

};
