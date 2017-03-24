// gruntfile.js
//
// Author: blinklv <blinklv@icloud.com>
// Create Time: 2017-03-22
// Maintainer: blinklv <blinklv@icloud.com>
// Last Change: 2017-03-24
// Purpose: The gruntfile.js for Web development.

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

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

        // Minifying CSS files.
        cssmin: {
            target: {
                src: "css/main.css",
                dest: "css/main.min.css"
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
                dest: "js/main.min.js"
            }
        },


        // Adding a banner information to some files.
        usebanner: {
            main: {
                options: {
                    position: "top",
                    banner: "<%= create_banner() %>"
                },
                files: {
                    src: ["css/main.min.css", "js/main.min.js"]
                }
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

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-banner");
    grunt.registerTask("default", ["concat", "cssmin", "uglify", "usebanner"]);
};




