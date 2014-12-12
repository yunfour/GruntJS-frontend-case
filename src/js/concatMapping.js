var path = require('path'),
    fs   = require('fs');

// 模块类型和其对应的模块的映射关系
var rootDirs = {
    base        : 'src/js/base/',
    components  : 'src/js/components/',
    common      : 'src/js/common/',
    pages       : 'src/js/pages/'
};

var mapping = [];

// 过滤*-debug的JS文件（如果文件为-debug文件，则将其排除）
var filterDebugJS = function(filePath) {
    
    var result = filePath.indexOf('-debug.') === -1;
    
    return result;
};


var indexMapping = {};

// 添加合并信息项
var mappingPush = function(fileInfo) {
    
    var dest = fileInfo.dest,
        destIndex = indexMapping[dest];
    
    if(!destIndex && destIndex !== 0) {

        // 为避免mapping数组出现重复项，将其dest和数组索引关联到indexMapping中
        indexMapping[dest] = mapping.length;
        mapping.push(fileInfo);
    } else {
        
        mapping[destIndex] = fileInfo;
    }
};

/*
 * 函数: processMapping(type, moduleName, version, isConcat)
 * 作用: 为制定模块生成合并映射关系(在使用 grunt-contrib-concat 插件
 *      进行合并的时候,使用该映射关系,具体位置在:Gruntfile.concat)
 * 参数:
 *    type——模块类型；类型：字符串，common：公共模块，components：组件模块，page：页面模块；必填
 *    moduleName——模块名称；类型：字符串；必填
 *    version——模块版本号；类型：字符串（如：0.4.3）；必填
 *    isConcat——是否将模块合并到主模块的js文件中；类型：布尔；选填，默认值为true，合并到主模块js文件中，false时不合并，

所有模块独立成一个js文件
*/
var processMapping = function(type, moduleName, version, isConcat) {
    var theRootDir = rootDirs[type],
        
        distDirPath          = 'js/' + type + '/' + moduleName + '/' + version + '/',
        srcDirPath           = theRootDir + moduleName + '/' + version + '/',
        
        // 源文件路径
        srcFilesPath         = srcDirPath + '*.js',
        srcFilesPathDebug    = srcDirPath + '*-debug.js',
        srcCssFilesPathDebug = srcDirPath + '*-debug.css.js',
        
        // 目标文件路径
        distFilesPath        = distDirPath + moduleName + '.js',
        distFilesPathDebug   = distDirPath + moduleName + '-debug.js',
        
        // 源文件的父目录的路径
        srcPathAbsolute      = path.resolve(srcDirPath);
    
    // 判断参数是否输入完整
    if(!type || !theRootDir || !moduleName || !version || srcPathAbsolute.indexOf('.svn') !== -1) {
        return;
    }
    
    // 读取目录下的文件列表
    var srcDirFiles = fs.readdirSync(srcPathAbsolute);
    
    if(arguments.length <= 3) {
        isConcat = true;
    } else {
        isConcat = !!isConcat;
    }
    
    //console.log(type + '-' + moduleName + '-' + version + '-' + '--' + isConcat);
    
    // 判断是否将所有子模块文件都合并到主模块文件中
    if(isConcat) {
        
        // 合并该模块目录下的所有子模块到主模块中
        
        // 压缩版文件
        mappingPush({
            dest: distFilesPath,
            src: srcFilesPath.replace('/js/', '/js/_build/'),
            filter: filterDebugJS
        });
       
        // 未压缩版文件
        mappingPush({
            dest: distFilesPathDebug,
            src: [
                srcFilesPathDebug.replace('/js/', '/js/_build/'),
                srcCssFilesPathDebug.replace('/js/', '/js/_build/')
            ]
        });
    } else {
        
        /*
         * 不合并该模块目录下的所有模块到主模块，因此每个子模块都要有一个合并的对应关系，
         * 只有这样才避免合并插件contact自动将所有文件合并
         * 
         */
        
        var fileName,
            distFilePath,
            srcFilePath;
        
        // 判断文件是否为.js文件的正则表达式
        var jsExtReg = /\.js$/;
        
        for(var i = 0, l = srcDirFiles.length; i < l; i ++) {
            
            // 遍历目录下的所有文件，为每个文件生成一个合并映射
            
            fileName = srcDirFiles[i];
            
            /*
             * 判断文件是否为文件格式
             */
            if(!fs.lstatSync(srcDirPath + fileName).isFile()) {
                continue;
            }
            
            /*
             * 过滤.svn目录（使用SVN管理版本的话，每个
             * 目录下都会生成一个.svn目录，影响映射关系的生成）
             */
            if(fileName.indexOf('.svn') !== -1) {
                continue;
            }
            
            distFilePath        = distDirPath + fileName;
            distFilePathDebug   = distDirPath + fileName.replace('.js', '-debug.js');
            srcFilePath         = srcDirPath + fileName;
            srcFilePathDebug    = srcDirPath + fileName.replace('.js', '-debug.js');
            srcCSSFilePathDebug = srcDirPath + fileName.replace('.js', '-debug.css.js');
            
            mappingPush({
                dest: distFilePath,
                src: srcFilePath.replace('/js/', '/js/_build/')
            });
           
            if(jsExtReg.test(fileName)) {
                mappingPush({
                    dest: distFilePathDebug,
                    src: [
                        srcFilePathDebug.replace('/js/', '/js/_build/'),
                        srcCSSFilePathDebug.replace('/js/', '/js/_build/')
                    ]
                });
            }
        }
        
        // 如果源码中没有主模块文件，则将默认的主模块映射关系从mapping中删除
        if(srcDirFiles.indexOf(moduleName + '.js') === -1) {
            
            var mainModuleDestPath = distDirPath + moduleName + '.js',
                mainModuleSrcPath = srcDirPath + moduleName + '.js',
                mainModuleDestPathDebug = distDirPath + moduleName + '-debug.js',
                mainModuleSrcPathDebug = srcDirPath + moduleName + '-debug.js';
            
            var mainMouduleIndex = indexMapping[mainModuleDestPath],
                mainMouduleDebugIndex = indexMapping[mainModuleDestPathDebug];
            
            // 从mapping中删除主模块映射关系
            mapping[mainMouduleIndex] = {};
            mapping[mainMouduleDebugIndex] = {};
        }
    }
};

// 自动生成映射
var autoProcess = function() {
    var mappingArr = [];
    
    var process = function(k) {
        var moduleType = k,
            moduleName,
            version;
        
        var thePath,
            fileLst;
        
        var versionsPath,
            versions;
        
        thePath = path.resolve(rootDirs[k]);
        fileLst = fs.readdirSync(thePath);
        
        for(var i = 0, l = fileLst.length; i < l; i ++) {
            
            moduleName   = fileLst[i];
            versionsPath = thePath + '/' + fileLst[i];
            
            /*
             * 如果代码放到SVN上之后，每个目录下都会生成一个.svn目
             * 录，这样的话在遍历目录和文件时就会出现干扰，因此此处
             * 作出如此判断
             */
            if(versionsPath.indexOf('.svn') !== -1) {
                continue;
            }
            
            versions     = fs.readdirSync(versionsPath);
            
            for(var j = 0, vl = versions.length; j < vl; j ++) {
                version = versions[j];
                
                processMapping(moduleType, moduleName, version);
            }
        }
    };
    
    for(var key in rootDirs) {
        process(key);
    }
};


// 生成将某个类型中所有最新版本的模块合并到一个名字为：latestVersion.js的文件中的映射
var concatLatestVersion = function(moduleType) {
    var typeDirPath      = path.resolve('src/js/' + moduleType),
        typeSonDirs      = fs.readdirSync(typeDirPath),
        concatFiles      = [],
        concatDebugFiles = [];
        
    var sortFn = function(a, b) {
        var result = (a < b);
        
        return a - b;
    };
    
    for(var i = 0, l = typeSonDirs.length; i < l; i ++) {
        var versions = fs.readdirSync(typeDirPath + '/' + typeSonDirs[i]);
        
        /*
         * 如果代码放到SVN上之后，每个目录下都会生成一个.svn目
         * 录，这样的话在遍历目录和文件时就会出现干扰，因此此处
         * 作出如此判断
         */
        if(typeSonDirs[i].indexOf('.svn') !== -1) {
            continue;
        }
        
        versions.sort(sortFn);
        
        concatFiles.push('src/js/_build/' + moduleType + '/' + typeSonDirs[i] + '/' + versions[0] + '/*.js');
        //concatFiles.push('src/js/_build/' + moduleType + '/' + typeSonDirs[i] + '/' + versions[0] + '/*.css.js');
        concatDebugFiles.push('src/js/_build/' + moduleType + '/' + typeSonDirs[i] + '/' + versions[0] + '/*-debug.js');
        //concatDebugFiles.push('src/js/_build/' + moduleType + '/' + typeSonDirs[i] + '/' + versions[0] + '/*-debug.css.js');
    }
    
    
    mappingPush({
        dest: 'js/' + moduleType + '/concat/latestVersion.js',
        src: concatFiles,
        filter: filterDebugJS
    });
    mappingPush({
        dest: 'js/' + moduleType + '/concat/latestVersion-debug.js',
        src: concatDebugFiles
    });
};

// 合并所有版本的模块
var concatAllVersion = function(moduleType) {
    mappingPush({
        dest: 'js/' + moduleType + '/concat/allVersion.js',
        src: [
            'src/js/_build/' + moduleType + '/**/*.js',
            'src/js/_build/' + moduleType + '/**/*.css.js'
        ],
        filter: filterDebugJS
    });
    mappingPush({
        dest: 'js/' + moduleType + '/concat/allVersion-debug.js',
        src: [
            'src/js/_build/' + moduleType + '/**/*-debug.js',
            'src/js/_build/' + moduleType + '/**/*-debug.css.js'
        ]
    });
};


autoProcess();


// 生成将base类型中所有最新版本的模块合并到一个名字为：latestVersion.js的文件中的映射
concatLatestVersion('base');
// 生成将components类型中所有最新版本的模块合并到一个名字为：latestVersion.js的文件中的映射
concatLatestVersion('components');
// 生成将common类型中所有最新版本的模块合并到一个名字为：latestVersion.js的文件中的映射
concatLatestVersion('common');


// 生成将base类型中所有模块的文件合并到一个名字为：allVersion.js的文件中的映射
concatAllVersion('base');
// 生成将components类型中所有模块的文件合并到一个名字为：allVersion.js的文件中的映射
concatAllVersion('components');
// 生成将common类型中所有模块的文件合并到一个名字为：allVersion.js的文件中的映射
concatAllVersion('common');


// 单独处理模块的合并关系
// processMapping('components', 'dialog', '1.0.0', false);
// processMapping('components', 'dialog', '1.0.1', false);


//console.log('合并文件映射关系：');
//console.log(mapping);


// 生成合并关系的方法，参数noConcatOpts为不需要合并的模块的配置
/*
 * noConcatOpts = [
 *     {
 *         type: 模块类型，如base、components、common等
 *         name: 模块名称，如dialog、tip等
 *         version: 模块版本号
 *     },
 *     ...
 * ]
 */
function configNoConcat(noConcatOpts) {
    
    var opts = noConcatOpts || [];
    
    for(var i = 0, l = opts.length, opt; i < l; i++) {
        
        opt = opts[i];
        
        processMapping(opt.type, opt.name, opt.version, false);
    }
    
    try {
        
        // 将映射对应关系数据存储到concatMapping.json文件中
        fs.writeFileSync('src/js/concatMapping.json', JSON.stringify(mapping));
        console.log('合并文件映射关系已生成！');
    } catch(ex) {
        
        console.log('合并文件映射关系生成失败:\n' + ex);
    }
    
    return mapping;
}

module.exports = configNoConcat;
