//  gruntfile.js
//
// Author: blinklv <blinklv@icloud.com>
// Create Time: 2017-03-22
// Maintainer: blinklv <blinklv@icloud.com>
// Last Change: 2018-06-05
//
// The gruntfile.js for my Web development.  Many settings are personalized for me, but
// how it works I will explain in README.md file.  So If you like it, you can copy this 
// file (grunfile.js) and package.json file to your project.

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Project metadata is imported into the Grunt config from the project's package.json.
        pkg: grunt.file.readJSON("package.json"),
    });
};

