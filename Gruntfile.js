(function() {
    module.exports = function(grunt) {
        "use strict";

        require("time-grunt")(grunt);
        require("load-grunt-tasks")(grunt, {
            pattern: ["grunt-*", "!grunt-template-jasmine-istanbul", "!grunt-template-jasmine-requirejs"]
        });

        grunt.initConfig({
            PATHS: {
                BUILD:  __dirname + "/dist/"
            },

            pkg: grunt.file.readJSON("package.json"),
            ARTIFACT_ZIP : "dist.zip",
            srcFiles: ["js/*.js", "js/**/*.js", "templates/**/*.js"],
            
            clean: ["<%=PATHS.BUILD%>"],

            jshint2: {
                options : {
                    jshintrc : ".jshintrc",
                    processor: "async",
                    spawnLimit: 50
                },
                files: ["Gruntfile.js", "<%= srcFiles %>"]
            },

            jscs: {
                src: "<%= srcFiles %>",
                options: {
                    config: ".jscsrc"
                }
            },

            bump: {
                options: {
                    files: ["bower.json", "package.json"],
                    commitMessage: "Release %VERSION%",
                    commitFiles: ["bower.json", "package.json"],
                    createTag: true,
                    tagName: "%VERSION%",
                    tagMessage: "Version %VERSION%",
                    pushTo: "origin master"
                }
            },

            connect : {
                api : {
                    options : {
                        hostname : "*",
                        port : grunt.option("apiport") || 8070,
                        base : __dirname + "/dev/response",
                        keepalive : true,

                        /* Added CORS configuration for Firefox to download webfonts. Our S3 buckets will
                           have this same configuration. */
                        middleware: function(connect, options) {
                            return [
                                function(req, res, next) {
                                    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8099");
                                    res.setHeader("Access-Control-Allow-Methods", "*");
                                    res.setHeader("Access-Control-Allow-Credentials", "true");
                                    res.setHeader("Access-Control-Allow-Headers", "accept, csrftoken, origin");
                                    next();
                                },
                                /*
                                    Below is the middleware code that is used to serve mock JSON files.
                                    The request url is passed via the variable "url" within the JavaScript 
                                    code. The url is built up in the server by prefixing "options" and 
                                    "base" to the url and then suffixing it with ".json". The options and 
                                    base are declared above. The url is passed through nested if statements 
                                    -> (!getFile(parameters)) the first statement takes the url(*filename* 
                                    as a parameter) and checks whether it exists. If the file exists true 
                                    is returned and the function completes and the file is passed back and 
                                    read into the application. If the file does not exist, false is retuned 
                                    and then passed into the next if statement. The second if statement is 
                                    the same function (!getFile(parameters)) except the parameters are 
                                    defined by another function (makeDefaultPath(parameters)). Within this 
                                    function a number of other javascript methods are used. Firstly the url 
                                    is 'split(/)' (This breaks up the url string into an array of strings 
                                    which are separated by '/'). Secondly the url is cut-down with the pop 
                                    function (the last string from the split is removed from the end). Next 
                                    the push function adds 'default.json' to the end of the array of strings. 
                                    Lastly the join function packages the array back up into one string 
                                    which is used as the parameters of (!getFile(parameters)) The 
                                    (!getFile(parameters)) is ran for the second time and the method is the 
                                    same as the first time. As before the function checks whether the file 
                                    exists. If the file exists true is returned and the function completes
                                    and the file is passed back and read into the application. If the file 
                                    does not exist, false is retuned and the next() method is called, which 
                                    allows the method to continue without falling over and and the default 
                                    error is sent to the screen. 

                                    Example showing adding .json split, pop, push and join
                                    url = "dev/response/kpi/21"
                                    filename = "dev/response/kpi/21.json"
                                    "dev/response/kpi/21.json" -->SPLIT--> ["dev/" "response/" "kpi/" "21.json"]
                                    ["dev/" "response/" "kpi/" "21.json"] -->POP--> ["dev/" "response/" "kpi/"]
                                    ["dev/" "response/" "kpi/"] -->PUSH--> ["dev/" "response/" "kpi/" "default.json"]
                                    ["dev/" "response/" "kpi/" "default.json" -->JOIN "dev/response/kpi/default.json"

                                */
                                function(req, res, next){

                                    function makeDefaultPath(path) {
                                        var fallback = path.split("/");
                                        fallback.pop();
                                        fallback.push("default.json");
                                        var defaultCallback =fallback.join("/");
                                        return defaultCallback;
                                    }

                                    function getFile(file){
                                        if(fs.existsSync(file)){
                                            console.log("File found ->", file);
                                            res.end(fs.readFileSync(file));
                                            return true;
                                        } else {
                                            console.log("No file found ->", file);
                                            return false;
                                        }
                                    }
                                    console.log("Request url ->" + req.url);
                                    var fs = require("fs");
                                    var fileName = options.base[0]+req.url+".json";
                                    console.log("Looking for file ->" + fileName);
                                    if(!getFile(fileName)){
                                        if(!getFile(makeDefaultPath(fileName))){
                                            console.log("No URL match");
                                            next();
                                        }
                                    }
                                },

                                connect.static(options.base[0])
                            ];
                        }
                    }
                },
                server : {
                    options : {
                        hostname : "*",
                        port : 9200,
                        base : __dirname,
                        keepalive : true,

                        /* Added CORS configuration for Firefox to download webfonts. Our S3 buckets will
                           have this same configuration. */
                        middleware: function(connect, options) {
                            return [
                                function(req, res, next) {
                                    res.setHeader("Access-Control-Allow-Origin", "*");
                                    res.setHeader("Access-Control-Allow-Methods", "*");
                                    next();
                                },

                                connect.static(options.base[0])
                            ];
                        }
                    }
                },

            },

            compress: {
                main: {
                    options: {
                        archive: "<%=PATHS.BUILD%><%=ARTIFACT_ZIP%>"
                    },
                    files: [
                        {expand: true, src : ["dist/**/*", "bower.json"], dest : "<%= pkg.name %>-<%= pkg.version %>"}
                    ]
                }
            },

            requirejs: {
                compile: {
                    options: {
                        optimize : grunt.option("optimize") || "none",
                        preserveLicenseComments: false,
                        baseUrl : "js",
                        waitSeconds: 15,
                        generateSourceMaps: grunt.option("maps") || false,
                        uglify2 : {
                            output : {
                                "max_line_len" : 0
                            }
                        },

                        paths: {
                            "backbone"              : "empty:",
                            "bootstrap"             : "empty:",
                            "hbs"                   : "../bower_components/require-handlebars-plugin/hbs",
                            "i18n"                  : "empty:",
                            "jquery"                : "empty:",
                            "marionette"            : "empty:",
                            "marionette.subrouter"  : "empty:",
                            "moment"                : "empty:",
                            "underscore"            : "empty:",
                            "highcharts"            : "empty:",
                            "fullcalendar"          : "empty:",
                            "templates"             : "../templates",
                            "locales"               : "../locales"
                        },

                        hbs : {
                            templateExtension : "template"
                        },

                        shim: {
                            "bootstrap" : ["jquery"],
                            "fullcalendar": {
                                deps: ["jquery"]
                            },
                            "highcharts" : {
                                deps : ["jquery"],
                                exports: "Highcharts"
                            }
                        },

                        deps: ["config"],

                        name: "ExampleApp",
                        
                        out: "<%= PATHS.BUILD %>js/<%= pkg.name %>.min.js"
                    }
                }
            },

            sass: {
                dist : {
                    options: {
                        includePaths: require("node-bourbon").includePaths,
                        outputStyle: "compressed"
                    },
                    files: {
                        "<%= PATHS.BUILD %>css/<%= pkg.name %>.min.css" : "css/main.scss",
                        "<%= PATHS.BUILD %>css/fullcalendar.min.css" : "bower_components/fullcalendar/dist/fullcalendar.min.css"
                    }
                }
            },

            copy: {
                img: {
                    src: "img/*",
                    dest: "<%= PATHS.BUILD %>img",
                    expand: true,
                    flatten: true
                }
            },
            // Unit testing with jasmine
            jasmine: {
                test: {
                    src: "js/**/*.js",
                    options: {
                        keepRunner:true,
                        specs: "test/jasmine/spec/*.js",
                        template: require("grunt-template-jasmine-requirejs"),
                        templateOptions: {
                            requireConfigFile: __dirname + "/test/config.js",
                            requireConfig: {
                                baseUrl: "./js",
                            }
                        }
                    }
                }
            }

        });

        // Tasks
        grunt.registerTask("test", ["jshint2", "jscs"]);
        grunt.registerTask("compile", ["requirejs:compile", "sass:dist", "copy:img"]);
        grunt.registerTask("default", ["clean", "test", "compile", "compress"]);
        grunt.registerTask("server", ["connect"]);
    };
})();
