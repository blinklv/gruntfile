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
                src: ["css/*.css", "!css/*.min.css"],
                dest: "css/main.css"
            },
            js: {
                src: ["js/*.js", "!js/*.min.js"],
                dest: "js/main.js"
            }
        },

        // Minifying CSS files.
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: "css/",
                    src: ["*.css", "!*.min.css"],
                    dest: "css/",
                    // I think 'rename' is better than 'ext', sometimes 
                    // I use 'ext' option which causes some tail information
                    // to be lost, eg: 'style.1.0.0.css' become 'style.min.css'.
                    rename: function(dst, src) {
                        return dst + "/" + src.replace(".css", ".min.css");
                    }
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
            target: {
                files: [{
                    expand: true,
                    cwd: "js/",
                    src: ["*.js", "!*.min.js"],
                    dest: "js/",
                    // Why I use 'rename' option not 'ext' option?
                    // Please look the configure of 'cssmin'. :)
                    rename: function(dst, src) {
                        return dst + "/" + src.replace(".js", ".min.js");
                    }
                }]
            }
        },


        // Adding a banner information to some files.
        usebanner: {
            css_js: {
                options: {
                    position: "top",
                    banner: "<%= create_banner() %>"
                },
                files: {
                    src: ["css/*.min.css", "js/*.min.js"]
                }
            },
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

    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-banner");
};




