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
                tasks: ["sass", "concat:css", "cssmin", "usebanner:css"]
            },
            css: {
                files: ["css/*.css", "!css/main.css", "!css/*.min.css"],
                tasks: ["concat:css", "cssmin", "usebanner:css"]
            },
            js: {
                files: ["js/*.js", "!js/main.js", "!js/*.min.js"],
                tasks: ["jshint:before_concat", "concat:js", "uglify", "usebanner:js"]
            },
            mainjs: {
                files: "js/main.js",
                tasks: ["jshint:after_concat"]
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
            before_concat: ["js/*.js", "!js/main.js", "!js/*.min.js"],
            after_concat: ["js/main.js"]
        },

        // Concatenate files, but exclude some files of 'min' suffix.
        concat: {
            css: {
                src: ["css/*.css", "!css/main.css","!css/*.min.css"],
                dest: "css/main.css"
            },
            js: {
                src: ["js/*.js", "!js/main.js", "!js/*.min.js"],
                dest: "js/main.js"
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

        // Minifying CSS files.
        cssmin: {
            target: {
                src: "css/main.css",
                dest: "build/main.min.css"
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
            target: {
                src: "js/main.js",
                dest: "build/main.min.js"
            }
        },


        // Adding a banner information to some files.
        usebanner: {
            options: {
                position: "top",
                banner: "<%= create_banner() %>"
            },
            css: {
                src: "build/main.min.css"
            },
            js: {
                src: "build/main.min.js"
            }
        },

        // Auxiliary method.
        create_banner: function() {
            var str = "";
            var pkg = this.pkg;

            // If 'pkg.name' is empty, the 'banner' is empty too.
            if (pkg.name) {
                str = "/*! " + pkg.name;
                if (pkg.version) str += " v" + pkg.version;
                str += " " + grunt.template.today("yyyy-mm-dd");
                if (pkg.license) str += " | " + pkg.license;
                if (pkg.url) str += " | " + pkg.url;
                str += " */";
            } 

            return str;
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-banner");
    grunt.registerTask("default", ["jshint:before_concat", "sass", "concat", "jshint:after_concat", "cssmin", "uglify", "usebanner"]);
};




