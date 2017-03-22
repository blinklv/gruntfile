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
                    ext: ".min.css"
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-cssmin");
};




