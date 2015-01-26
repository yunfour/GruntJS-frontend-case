module.exports = function (grunt) {
    
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);
    
    var aliasInfo = grunt.file.readJSON("alias_info.json");
    
    // 生成合并的映射关系，在concat插件中使用
    var configNoConcat = require('./src/js/concatMapping');
    
    // 过滤*-debug的JS文件
    var filterDebugJS = function(filePath) {
        var result = filePath.indexOf('-debug.') === -1;
        
        return result;
    };
    
    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        
        // 监视变动
        watch: {
            files: [
                'src/js/base/**/*.js',
                'src/js/common/**/*.js',
                'src/js/components/**/*.js',
                'src/js/pages/**/*.js',
                'src/js/config/**/*.js',
                'src/js/concatMapping.js',
                'src/js/**/*.css',
                
                './Gruntfile.js',
                
                'src/less/**/*.less',
                
                'src/css/**/*.css'
            ],
            tasks: [
                'less',
                'jshint',
                'transport',
                'concat',
                'uglify',
                'clean'
            ]
        },
        
        // js验证
        jshint: {
            options: {
                immed: false
            },
            foo: {
                src: [
                    'src/js/base/**/*.js',
                    'src/js/components/**/*.js',
                    'src/js/common/**/*.js',
                    'src/js/pages/**/*.js',
                    'src/js/config/**/*.js',
                    'src/js/concatMapping.js',
                    './Gruntfile.js'
                ]
            }
        },
        
        // 转换cmd模块
        transport : {
            options: {
                paths: ['src'],
                alias: aliasInfo,
                
                parsers: {
                    '.js': [script.jsParser],
                    //'.css': [style.css2jsParser]  // 将css转换成js文件
                    '.css': [style.cssParser]
                },
                
                // 是否生产-debug文件
                debug: true
            },
            // 基础模块
            base : {
                options: {
                    idleading: 'base/'
                },
                files : [
                    {
                        expand: true,
                        cwd: 'src/js/base',
                        src : '**/*.js',
                        dest : 'src/js/_build/base/'
                    }
                ]
            },
            // 公共组件
            components : {
                options: {
                    idleading: 'components/'
                },
                files : [
                    {
                        expand: true,
                        cwd: 'src/js/components',
                        src : ['**/*.js', '**/*.css'],
                        dest : 'src/js/_build/components/'
                    }
                ]
            },
            // 公共模块
            common : {
                options: {
                    idleading: 'common/'
                },
                files : [
                    {
                        expand: true,
                        cwd: 'src/js/common',
                        src : '**/*.js',
                        dest : 'src/js/_build/common/'
                    }
                ]
            },
            // 页面及模块
            pages : {
                options: {
                    idleading: 'pages/'
                },
                files : [
                    {
                        expand: true,
                        cwd: 'src/js/pages',
                        src : '**/*.js',
                        dest : 'src/js/_build/pages/'
                    }
                ]
            }
        },
        
        // 复制文件
        copy: {
            styles: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/_build/',
                        src: '**/*.css',
                        dest: 'js/'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        dest: 'js/',
                        src: '**/*.jpg'
                    },
                    {
                        expand: true,
                        cwd: 'src/js/',
                        dest: 'js/',
                        src: '**/*.jpeg'
                    },
                    {
                        expand: true,
                        cwd: 'src/js/',
                        dest: 'js/',
                        src: '**/*.gif'
                    },
                    {
                        expand: true,
                        cwd: 'src/js/',
                        dest: 'js/',
                        src: '**/*.png'
                    },
                    {
                        expand: true,
                        cwd: 'src/js/',
                        dest: 'js/',
                        src: '**/*.bmp'
                    }
                ]
            }
        },
        
        // 合并文件
        concat: {
            options: {
                separator: '\n;'
            },
            dist: {
                files: configNoConcat([
                    // 配置不需要合并的模块
                    
                    {
                        type: 'components',
                        name: 'dialog',
                        version: '1.0.0'
                    },
                    {
                        type: 'components',
                        name: 'dialog',
                        version: '1.0.1'
                    }
                ])
            }
        },
        
        // 压缩文件
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            // 压缩配置文件
            config: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/config/',
                        src: '**/*.js',
                        dest: 'js/config/'
                    }
                ]
            },
            base: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/base/',
                        src: '**/*.js',
                        dest: 'js/base/',
                        filter: filterDebugJS
                    }
                ]
            },
            // 压缩seajs模块
            components: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/components/',
                        src: '**/*.js',
                        dest: 'js/components/',
                        filter: filterDebugJS
                    }
                ]
            },
            common: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/common/',
                        src: '**/*.js',
                        dest: 'js/common/',
                        filter: filterDebugJS
                    }
                ]
            },
            pages: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/pages/',
                        src: '**/*.js',
                        dest: 'js/pages/',
                        filter: filterDebugJS
                    }
                ]
            }
        },
        
        // 编译LESS文件
        less: {
            options: {
                // 是否生成压缩的css
                compress: true,
            },
            default: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/less/1.0.0/',
                        src: '*.less',
                        ext: '.min.css',
                        dest: 'css/1.0.0/'
                    }
                ]
            }
        },
        
        // 清理临时文件
        clean: {
            // 清理js/文件夹，以备生成最新的js模块文件使用
            js_dest: {
                src: [
                    'js/'
                ]
            },
            
            // 清理临时文件夹src/js/_build
            build: {
                src: [
                    'src/js/_build'
                ]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    /*
     * 插件执行顺序:
     * 1、使用jshint插件对js进行验证
     * 2、使用transport插件对所有cmd模块（seajs模块是cmd的一个子集）提取id等操作
     *    见处理好的模块转移到src/js/build目录中
     * 3、使用copy插件将src/js/目录下的所有样式和图片copy到js/目录下对应的目录中
     * 4、使用concat插件按规则对上一步处理src/js/build/下的模块进行合并，将合并后的文件转移到js/目录中；
     *    合并规则详细见concat的配置和src/js/concatMapping.js中
     * 5、使用uglify插件对上一步中合并好的在js/下的js进行压缩处理
     * 6、使用watch插件对文件进行监视，如果文件变得，则按顺序执行以上4步的任务
     */
    grunt.registerTask('default', [
        'clean:js_dest',
        'less',
        'jshint',
        'transport',
        'copy',
        'concat',
        'uglify',
        'clean:build',
        //'watch'
    ]);
};
