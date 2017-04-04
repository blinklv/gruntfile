// gruntfile.js
//
// Author: blinklv <blinklv@icloud.com>
// Create Time: 2017-03-22
// Maintainer: blinklv <blinklv@icloud.com>
// Last Change: 2017-04-04
// Purpose: The gruntfile.js for Web development.

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        // Watch all files.
        watch: {
            sass: {
                files: ["sass/*.sass", "sass/*.scss"],
                tasks: ["sass", "concat:css"]
            },
            css: {
                files: ["css/*.css", "!css/*.min.css"],
                tasks: ["concat:css"]
            },
            js: {
                files: ["js/*.js", "!js/main.js","!js/*.min.js"],
                tasks: ["concat:js", "jshint"]
            }
        },

        // Copy files from vendor directory to build/devel directory.
        copy: {
            target: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: "vendor/",
                    src: ["**/*.css", "!**/*.min.css"],
                    dest: "build/devel/css/",
                },{
                    expand: true,
                    flatten: true,
                    cwd: "vendor/",
                    src: ["**/*.js", "!**/*.min.js"],
                    dest: "build/devel/js/",
                }]
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            target: ["gruntfile.js", "js/*.js", "!js/main.js"]
        },

        // Concatenate files, but exclude some files of 'min' suffix.
        concat: {
            css: {
                src: ["css/*.css", "!css/main.css","!css/*.min.css"],
                dest: "build/devel/css/main.css"
            },
            js: {
                src: ["js/*.js", "!js/main.js", "!js/*.min.js"],
                dest: "build/devel/js/main.js"
            }
        },

        // Compiling SASS files to CSS files.
        sass: {
            target: {
                files: [{
                    expand: true,
                    cwd: "sass/",
                    src: ["*.sass", "*.scss"],
                    dest: "css/",
                    ext: ".css"
                }]
            }
        },

        // Remove unused CSS.
        uncss: {
          target: {
            expand: true,
            cwd: "build/devel/",
            src: "**/*.html",
            dest: "css/tidy.css"
          }
        },

        // Minifying CSS files.
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ["css/main.css", "vendor/**/*.css", "!vendor/**/*.min.css"],
                    dest: "build/css/",
                    ext: ".min.css",
                    extDot: "last"
                }]
            }
        },

        // Minifying JS files.
        uglify: {
            options: {
                mangle: false,
                compress: {
                    drop_console: true
                }
            },
            main: {
                src: "js/main.js",
                dest: "build/js/main.min.js"
            },
            vendor: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: "vendor/",
                    src: ["**/*.js", "!**/*.min.js"],
                    dest: "build/js/",
                    ext: ".min.js",
                    extDot: "last"
                }]
            }
        },


        // Adding a banner information to some files.
        usebanner: {
            options: {
                position: "top",
                banner: "<%= create_banner() %>"
            },
            css: {
                src: "build/css/main.min.css"
            },
            js: {
                src: "build/js/main.min.js"
            }
        },

        // Auxiliary method.
        create_banner: function() {
            var str = "";
            var pkg = this.pkg;

            // If 'pkg.name' is empty, the 'banner' is empty too.
            if (pkg.name) {
                str = "/*! " + pkg.name;
                str = pkg.version ? str + " v" + pkg.version : str;
                str += " " + grunt.template.today("yyyy-mm-dd");
                str = pkg.license ? str + " | " + pkg.license : str;
                str = pkg.url ? str +  " | " + pkg.url : str;
                str += " */";
            } 

            return str;
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-uncss");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-banner");
    grunt.registerTask("default", ["sass", "concat", "jshint", "cssmin", "uglify", "usebanner"]);
};




