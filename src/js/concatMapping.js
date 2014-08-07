var path = require('path'),
    fs   = require('fs');

// 模块类型和其对应的模块的映射关系
var rootDirs = {
    common      : 'src/js/common/',
    components  : 'src/js/components/',
    base        : 'src/js/base/',
    pages       : 'src/js/pages/'
};

var mapping = {};

/*
 * 函数: processMapping(type, moduleName, version, isConcat)
 * 作用: 为制定模块生成合并映射关系(在使用 grunt-contrib-concat 插件
 *      进行合并的时候,使用该映射关系,具体位置在:Gruntfile.concat)
 * 参数:
 *    type——模块类型；类型：字符串，common：公共模块，components：组件模块，page：页面模块；必填
 *    moduleName——模块名称；类型：字符串；必填
 *    version——模块版本号；类型：字符串（如：0.4.3）；必填
 *    isConcat——是否将模块合并到主模块的js文件中；类型：布尔；选填，默认值为true，合并到主模块js文件中，false时不合并，所有模块独立成一个js文件
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
        srcPathAbsolute     = path.resolve(srcDirPath),
        
        // 读取目录下的文件列表
        srcDirFiles         = fs.readdirSync(srcPathAbsolute);
    
    // 判断参数是否输入完整
    if(!type || !theRootDir || !moduleName || !version) {
        return;
    }
    
    if(arguments.length <= 3) {
        isConcat = true;
    } else {
        isConcat = !!isConcat;
    }
    
    if(isConcat) {
        
        // 合并该模块目录下的所有模块到主模块中
        mapping[distFilesPath]      = [
            srcFilesPath.replace('/js/', '/js/_build/')
        ];
        
        mapping[distFilesPathDebug] = [
            srcFilesPathDebug.replace('/js/', '/js/_build/'),
            srcCssFilesPathDebug.replace('/js/', '/js/_build/')
        ];
    } else {
        
        /*
         * 不合并该模块目录下的所有模块到主模块，因此每个子模块都要有一个合并的对应关系，
         * 只有这样才避免合并插件contact自动将所有文件合并
         * 
         */
        
        var fileName,
            distFilePath,
            srcFilePath;
        
        for(var i = 0, l = srcDirFiles.length; i < l; i ++) {
            
            // 遍历目录下的所有文件，为每个文件生成一个合并映射
            
            fileName = srcDirFiles[i];
            
            distFilePath                = distDirPath + fileName;
            distFilePathDebug           = distDirPath + fileName.replace('.js', '-debug.js');
            srcFilePath                 = srcDirPath + fileName;
            srcFilePathDebug            = srcDirPath + fileName.replace('.js', '-debug.js');
            srcCSSFilePathDebug         = srcDirPath + fileName.replace('.js', '-debug.css.js');
            
            mapping[distFilePath]       = [
                srcFilePath.replace('/js/', '/js/_build/')
            ];
            mapping[distFilePathDebug]  = [
                srcFilePathDebug.replace('/js/', '/js/_build/'),
                srcCSSFilePathDebug.replace('/js/', '/js/_build/')
            ];
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
        
        return result;
    };
    
    for(var i = 0, l = typeSonDirs.length; i < l; i ++) {
        var versions = fs.readdirSync(typeDirPath + '/' + typeSonDirs[i]);
        
        versions.sort(sortFn);
        
        concatFiles.push('src/js/_build/' + moduleType + '/' + typeSonDirs[i] + '/' + versions[0] + '\/*.js');
        concatFiles.push('src/js/_build/' + moduleType + '/' + typeSonDirs[i] + '/' + versions[0] + '\/*.css.js');
        concatDebugFiles.push('src/js/_build/' + moduleType + '/' + typeSonDirs[i] + '/' + versions[0] + '\/*-debug.js');
        concatDebugFiles.push('src/js/_build/' + moduleType + '/' + typeSonDirs[i] + '/' + versions[0] + '\/*-debug.css.js');
    }
    
    mapping['js/' + moduleType + '/concat/latestVersion.js'] = concatFiles;
    mapping['js/' + moduleType + '/concat/latestVersion-debug.js'] = concatDebugFiles;
};

var concatAllVersion = function(moduleType) {
    mapping['js/' + moduleType + '/concat/allVersion.js'] = [
        'src/js/_build/' + moduleType + '/**/*.js',
        'src/js/_build/' + moduleType + '/**/*.css.js'
    ];
    mapping['js/' + moduleType + '/concat/allVersion-debug.js'] = [
        'src/js/_build/' + moduleType + '/**/*-debug.js',
        'src/js/_build/' + moduleType + '/**/*-debug.css.js'
    ];
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
processMapping('components', 'dialog', '1.0.0', false);
processMapping('components', 'dialog', '1.0.1', false);


console.log('合并文件映射关系：');
console.log(mapping);

module.exports = mapping;