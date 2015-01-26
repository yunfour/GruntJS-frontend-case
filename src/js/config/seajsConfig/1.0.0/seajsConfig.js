(function() {
    var isDebug = false;
    
    var staticHost = seajs.resolve('../'),
        jsRootPath = staticHost + 'js/',
        jsSrcRootPath = staticHost + 'src/js/';
    
    var plugins = ['style'];
    
    if(
        location.href.indexOf('?debug=true') !== -1 ||
        location.href.indexOf('&debug=true') !== -1
    ) {
        
        isDebug = true;
    }
    
    if(isDebug) {
        
        jsRootPath = jsSrcRootPath;
        plugins.push('nocache');
    }

    seajs.config({
        
        paths: {
            gallery     : staticHost + 'gallery',
            
            css         : staticHost + 'css',
            
            base        : jsRootPath + 'base',
            components  : jsRootPath + 'components',
            common      : jsRootPath + 'common',
            pages       : jsRootPath + 'pages'
        },

        alias: {
            '$-debug'    : 'gallery/jquery/1.7.2/jquery.js',
            '$'          : 'gallery/jquery/1.7.2/jquery.js',
            'jqery'      : 'gallery/jquery/1.7.2/jquery.js',
            'jqery-debug': 'gallery/jquery/1.7.2/jquery.js',

            'zepto'      : 'gallery/zepto/1.1.4/zepto.min.js',
            'zepto-debug': 'gallery/zepto/1.1.4/zepto.js'
        },

        plugins: plugins,

        preload: [
            //'gallery/bootstrap/2.3.2/css/bootstrap.min.css',
            //'gallery/bootstrap/2.3.2/css/bootstrap-theme.min.css',
            //'css/1.0.0/common.min.css',
            //'css/1.0.0/style.min.css'
        ],

        debuger: {
            
        }
    });
})();

