// gruntfile.js
//
// Author: blinklv <blinklv@icloud.com>
// Create Time: 2017-03-22
// Maintainer: blinklv <blinklv@icloud.com>
// Last Change: 2017-03-22
// Purpose: The gruntfile.js for Web development.

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

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
        }
    });

    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
};




