//  gruntfile.js
//
// Author: blinklv <blinklv@icloud.com>
// Create Time: 2017-03-22
// Maintainer: blinklv <blinklv@icloud.com>
// Last Change: 2018-06-14
//
// The gruntfile.js for my Web development.  Many settings are personalized for me, but
// how it works I will explain in README.md file.  So If you like it, you can copy this 
// file (grunfile.js) and package.json file to your project. I left many tips in comments,
// which can help me to configure this file :)

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
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
                    "css/font/**/*.{woff,woff2,eot,ttf,otf,svg}",
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
                expand: true,
                cwd: "build/devel/",
                src: [
                    // HTML, CSS and JS files are handled by other tasks; we only 
                    // need to copy some auxiliary resources.
                    "vendor/**", "!vendor/**/*.js", "!vendor/**/*.css",
                    "img/**", "css/font/**"
                    
                ],
                dest: "build/release/"
            }
        },

        // Compile Pug to HTML.
        pug: {
            devel: {
                options: {
                    // Output indented HTML. It's easier to debug. We don't concern about
                    // how many spaces it takes up, because the htmlmin task will reduce
                    // its size in the release version.
                    pretty: true
                },
                files: [{
                    expand: true,
                    src: "index.pug",
                    dest: "build/devel/",
                    ext: ".html",
                    extDot: "last"
                },{
                    expand: true,
                    cwd: "pug/",
                    src: "**/*.pug",
                    dest: "build/devel/html/",
                    ext: ".html",
                    extDot: "last"
                }]
            }
        },

        // Compile Sass to CSS.
        sass: {
            devel: {
                options: {
                  // Output style: expanded is a more typical human-made CSS style, with each
                  // property and rule taking up one line. Although this style takes up many
                  // spaces, it's easier to debug and the cssmin task will reduce its size 
                  // in the release version.
                  style: "expanded"
                },
                expand: true,
                cwd: "sass/",
                src: "**/*.{sass,scss}",
                dest: "build/devel/css/",

                // Replace any existing extension with '.css' in generated path.
                ext: ".css",

                // Used to indicate where the period indicating the extension is located. 
                // 'last' means the exntension begins after the last period.
                extDot: "last"
            }
        },

        // Sometimes, the css files of the vendor directory contain some external 
        // relative url references. But they are based on their specific package 
        // directory instead of your custom root directory. We will use the uncss to 
        // remove unused CSS and generate a single css file (main.css); it will be 
        // placed in a different directory (build/devel/css/). However, the relative 
        // url references in the main.css are based on the original root path; it's not
        // correct. The following task will replace any original relative url with
        // a new one based on the root path, which gurantees finding resources correctly.
        css_relative_url_replace: {
            release: {
                options: {
                    staticRoot: "build/devel/css/"
                },
                expand: true,
                cwd: "build/devel/vendor/",
                src: "**/*.css",
                // The conventional example doesn't satisfy my need, which combines multiple
                // source files and generate a signle target file. But I want to one
                // target file corresponds one source file. It doesn't be permitted if
                // I only set the dest field to a directory, but can work when I add
                // the following rename function :)
                dest: "build/devel/vendor/",
                rename: function(dest, src) {
                    return dest + src;
                }
            }
        },

        // Remove unused CSS and generate a main.css file.
        uncss: {
            release: {
                files: {
                    "build/devel/css/main.css": ["build/devel/index.html", "build/devel/html/**/*.html"]
                }
            }
        },

        concat: {
            // Concate all JS files of build/devel/js/ directory and its subdirectories
            // and generate a main.js file.
            release: {
                src: "build/devel/js/**/*.js",
                dest: "build/devel/js/main.js"
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

        // Flag suspicious usage in programs written in JavaScript.
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                esversion: 6, // Use ES6 as the JavaScript Syntax.
                globals: {
                    jQuery: true
                },
            },
            target: ["gruntfile.js", "js/**/*.js"]
        },

        // Process html files at build time to modify them depending on the release environment
        processhtml: {
            release: {
                expand: true,
                cwd: "build/devel/",
                src: ["index.html", "html/**/*.html"],
                dest: "build/devel/"
            }
        },

        // Minifying HTML files.
        htmlmin: {
            release: {
                options: {
                    removeComments: true, // Strip HTML comments.

                    // Collapse white space that contributes to text nodes in a document tree.
                    collapseWhitespace: true,

                    // Omit attribute values from boolean attributes.
                    collapseBooleanAttributes: true
                },
                expand: true,
                cwd: "build/devel/",
                src: ["index.html", "html/**/*.html"],
                dest: "build/release/"
            }
        },
        
        // Minifying CSS files.
        cssmin: {
            release: {
                // In fact, there is only one CSS file (main.css) we need to minify.
                src: "build/devel/css/main.css",
                dest: "build/release/css/main.min.css"
            }
        },

        // Minifying JS files.
        uglify: {
            options: {
                mangle: false,
                compress: {
                    // Discard calls to console.* functions. 
                    drop_console: true
                }
            },
            release: {
                files: [{
                    // In the build/devel/js directory, the only one JS file we need to
                    // minimize is the main.js file, which is generated by concat:devel
                    // task.
                    src: "build/devel/js/main.js",
                    dest: "build/release/js/main.min.js"
                },{
                    expand: true,
                    cwd: "build/devel/vendor/",
                    // We don't need to filter JS files ending with '.min.js'. Because
                    // they have already been skipped in copy:devel task.
                    src: "**/*.js",
                    dest: "build/release/vendor/",
                    ext: ".min.js",
                    extDot: "last"
                }]
            }
        },

        // Clean the 'build/' directory or its directories.
        clean: {
            devel: "build/devel",
            release: "build/release"
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-responsive-images");
    grunt.loadNpmTasks("grunt-contrib-pug");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-uncss");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify-es");
    grunt.loadNpmTasks("grunt-css-relative-url-replace");
    grunt.loadNpmTasks("grunt-processhtml");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("devel", "Build the project for the development environment", 
            ["pug", "sass", "jshint", "responsive_images", "copy:devel"]); 
    grunt.registerTask("release", "Build the project for the release environment", 
            ["devel", "css_relative_url_replace", "uncss", "cssmin", "concat", "uglify", "processhtml", "htmlmin", "copy:release"]);
    grunt.registerTask("rebuild-devel", "Rebuild the project for the development environment", ["clean:devel", "devel"]);
    grunt.registerTask("rebuild", "Rebuild the project for the release environment", ["clean", "release"]);
    grunt.registerTask("default", "Build the project", ["release"]);
};

