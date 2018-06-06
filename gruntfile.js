//  gruntfile.js
//
// Author: blinklv <blinklv@icloud.com>
// Create Time: 2017-03-22
// Maintainer: blinklv <blinklv@icloud.com>
// Last Change: 2018-06-06
//
// The gruntfile.js for my Web development.  Many settings are personalized for me, but
// how it works I will explain in README.md file.  So If you like it, you can copy this 
// file (grunfile.js) and package.json file to your project. I left many tips in comments,
// which can help me to configure this file :)

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Project metadata is imported into the Grunt config from the project's package.json.
        pkg: grunt.file.readJSON("package.json"),

        // Configure task-named properties. When a task is run, Grunt looks for 
        // its configuration under a property of the same name. 
        // NOTE: This anonymous object may contain any arbitrary data. As long as 
        // properties don't conflict with properties the tasks require, they will
        // be otherwise ignored.

        copy: {
            // Multi-tasks can hae multiple configurations. The copy task
            // has devel and release targets. Specifying both a task and 
            // target like 'grunt copy:devel' or 'grunt copy:release' will
            // process just the specified target's configuration, while 
            // running 'grunt copy' will iterate over all targets.
            devel: {
                // Copy files from the working directory and its subdirectory to build/devel
                // directory. (build is a subdirectory of your working directory)
                src: [
                    "index.html", "html/**/*.html",
                    "css/**/*.{css,css.map}", "!css/**/*.min.css",
                    "js/**/*.js", "!js/**/*.min.js",
                    "font/**/*.{woff,woff2,eot,ttf,otf,svg}",
                    // For bitmap, we need to resize and compress them. But for vector 
                    // images, we copy them to the destination directory directly.
                    "img/**/*.svg",

                    // Because the vendor directory contains third party resources. It's
                    // hard to control their content, so the current strategy is copying
                    // almost all files (except for some compress files) to the dest.
                    "vendor/**", "!vendor/**/*.min.*"
                ],
                dest: "build/devel/"
            },
            release: {
            }
        },

        // Compile Sass to CSS.
        sass: {
            devel: {
                options: {
                  // Output style: expanded is a more typical human-made CSS style, with each
                  // property and rule taking up one line. Although this style takes up many
                  // spaces, it's easier to debug and the cssmin task will reduce its space
                  // in the release version.
                  style: "expanded"
                },
                expand: true,
                cwd: "sass/",
                src: "**/*.{sass,scss}",
                dest: "build/devel/css/",

                // Replace any existing extension with '.css' in generated path.
                ext: ".css"
            }
        },

        responsive_images: {
            devel: {
                // An options property may be specified to override built-in defaults.
                // In addition, each target may have an options property which is specific 
                // to that target. Target-level options will override task-level options.
                options: {
                    // Chooses which graphics engine to use when resizing images. To use 
                    // GraphicsMagick, set this to 'gm'. To use ImageMagick, set this to
                    // 'im'. 
                    engine: "im",

                    // Only process files that do not already exist in the destination directory.
                    newFilesOnly: true,

                    // An array of objects containing the sizes and settings we want to resize
                    // our image to.
                    sizes: [{
                        // If a name is specified, then the file will be suffixed with this name.
                        // eg: my-image-s.jpg, your-image-xl.png.
                        name: "s",
                        width: 320,

                        // JPEG format only. The quality of the image, 100 being the highest
                        // quality and 1 being the lowest.
                        quality: 70
                    },{
                        name: "m",
                        width: 480,
                        quality: 70
                    },{
                        name: "l",
                        width: 720,
                        quality: 70
                    },{
                        name: "xl",
                        width: 1024,
                        quality: 70
                    },{
                        name: "xxl",
                        width: 1440,
                        quality: 70
                    }]
                },

                // Handle all specified format images in the 'img/' subdirectory and all
                // of its subdirectories. Move the results to 'build/devel/img/' dir.
                expand: true,
                src: "img/**/*.{jpg,jpeg,png,gif,webp}",
                dest: "build/devel/"
            }
        },
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-responsive-images");
    grunt.loadNpmTasks("grunt-contrib-sass");
};

