(function(global) {
    
    var loader = {};
    
    var READY_STATE_RE = /^(?:loaded|complete|undefined)$/,
        MODULE_CLASSNAME = '__module__',
        MODULE_SPLITER = ',';
    
    var mainModulesUrl = [];
    
    var doc      = document,
        loc      = global.location,
        head     = doc.getElementsByTagName("head")[0] || doc.documentElement,
        baseNode = document.createElement('base');
    
    head.appendChild(baseNode);
    
    var moduleClass  = '_module_script_node';
    var modulesCache = loader.modulesCache = {};
    
    var loaderScriptSrc = getInteractiveScriptSrc(),
        basePath        = getBasePath(loaderScriptSrc);
    
    function getBasePath(absoluteUrl) {
        var basePath = absoluteUrl.split('/');
        
        basePath.pop();
        basePath = basePath.join('/') + '/';
        
        return basePath;
    }
    
    function isType(type) {
        return function(obj) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        }
    }

    var isObject   = isType("Object");
    var isString   = isType("String");
    var isArray    = Array.isArray || isType("Array");
    var isFunction = isType("Function");
    
    // 获取script节点的绝对src路径
    function getScriptAbsoluteSrc(scriptNode) {
        var src;
        
        if(scriptNode.hasAttribute) {
            
            getScriptAbsoluteSrc = function(scriptNode) {
                return scriptNode.src;
            };
            
            src = scriptNode.src;
            
        } else {
            
            getScriptAbsoluteSrc = function(scriptNode) {
                return scriptNode.getAttribute('src', 4);
            };
            
            src = scriptNode.getAttribute('src', 4);
        }
        
        return src;
    }
    
    function addOnload(node, callback) {
        
        node.onload = node.onreadystatechange = node.onerror = function() {
            
            if(READY_STATE_RE.test(node.readyState)) {
                
                node.onload = node.onreadystatechange = node.onerror = null;
                
                head.removeChild(node);
                
                node = undefined;
                
                if(isFunction(callback)) {
                    callback();
                }
            }
        };
    }
    
    function loadJS(url, callback) {
        var node = document.createElement('script');
        
        addOnload(node, callback);
        
        node.async = true;
        node.src = url;
        node.className = MODULE_CLASSNAME;
        
        head.appendChild(node);
    }
    
    // 获取当前正在执行的<script/>节点
    function getInteractiveScriptSrc() {
        var scripts = head.getElementsByTagName('script'),
            script = null;
        
        script = doc.currentScript;
        
        if(!script) {
            
            return (function() {
                var stack;
                
                try{
                    
                    // 强制报错，比便捕捉e.stack
                    _a._b._c._d._e();
                    
                } catch(e){
                    
                    stack = e.stack;
                    
                    if(!stack && window.opera) {
                        /*
                         * Opera9浏览器没有e.stack，但是有e.Backtrace，但是不能直接取得，需要
                         * 对e进行字符串转换后提取
                         */
                        stack = (String(e).match(/of linked script \S+/g) || []).join(' ');
                    }
                }
                
                if(stack) {
                    
                    getInteractiveScript = arguments.callee;
                    
                    /**
                     * e.stack 最后一行在所有支持浏览器大致如下：
                     * Chrome 23:
                     * at http://www.baidu.com/data.js:4:1
                     * 
                     * FF17:
                     * @http://www.baidu.com/a.js
                     * @http://www.baidu.com/data.js
                     * 
                     * IE10:
                     * at global code (http://www.baidu.com/data.js:4:1)
                     * 
                     * FF4+ 可以使用document.currentScript
                     */
                    
                    // 取得最后一行，最后一个空格或者@之后的部分
                    stack = stack.split(/[@ ]/g).pop();
                    
                    // 去掉换行符
                    stack = stack[0] === '(' ?
                                stack.slice(1, -1) : stack.replace(/\s/, '');
                    
                    // 去掉行号与获取存在的出错字符起始位置
                    return stack.replace(/(:\d+)?:\d+$/i, '');
                }
                
                // 我们在动态加载模块时，节点都插入到head中，因此旨在head中查找标签
                var nodes = head.getElementsByTagName('script');
                
                for(var i = 0, l = nodes.length, node; i < l; i ++) {
                    node = nodes[i];
                    
                    if(node && node.readyState === 'interactive') {
                        return getScriptAbsoluteSrc(node);
                    }
                }
            })();
            
        } else {
            getInteractiveScript = function() {
                return getScriptAbsoluteSrc(doc.currentScript);
            };
        }
        
        return getScriptAbsoluteSrc(script);
    }
    
    var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g;
    var SLASH_RE = /\\\\/g;
    function getDependencies(code) {
        var ret = [];

        code.replace(SLASH_RE, "")
            .replace(REQUIRE_RE, function(m, m1, m2) {
                if (m2) {
                    ret.push(m2);
                }
            });
        
        return ret;
    }
    
    function define(factory) {
        var theUri       = getInteractiveScriptSrc(),
            module       = modulesCache[theUri] || (modulesCache[theUri] = {}),
            dependencies = [];
        
        module.factory = factory;
        
        if(isFunction(factory)) {
            
            dependencies = getDependencies(factory.toString());
            
        } else {
            
            module.exports = factory;
            module.executed = true;
        }
        
        module.dependencies = dependencies;
        
        for(var i = 0, l = dependencies.length; i < l; i ++) {
            
            request(dependencies[i]);
        }
    }
    
    function resolve(path) {
        var _basePath = getInteractiveScriptSrc() ? getBasePath(getInteractiveScriptSrc()) : basePath;
        path = path || '';
        
        baseNode.href = _basePath + path;
        
        path = baseNode.href;
        
        return path;
    }
    
    function execModules() {
        var scripts = head.getElementsByTagName('script');
        var interactiveNodeNum = 0;
        
        for(var i = 0, l = scripts.length; i < l; i ++) {
            
            if(scripts[i].className === MODULE_CLASSNAME) {
                interactiveNodeNum ++;
            }
        }
        
        // interactiveNodeNum === 0时说明所有的模块都已经加载完毕
        if(interactiveNodeNum === 0) {
            var mainModuleUri,
                mainModule;
            
            for(i = 0, l = mainModulesUrl.length; i < l; i ++) {
                mainModuleUri = resolve(mainModulesUrl[i]);
                
                mainModule = modulesCache[mainModuleUri];
                
                if(mainModule && !mainModule.executed) {
                    
                    if(isFunction(mainModule.factory)) {
                        
                        mainModule.exports = {};
                        mainModule.exports = mainModule.factory(require);
                    } else {
                        
                        mainModule.exports = mainModule.factory;
                    }
                }
            }
        }
    }
    
    function request(url) {
        var uri = resolve(url);
        
        if(!modulesCache[uri]) {
            
            modulesCache[uri] = {
                loaded: 'loading'
            };
            
            loadJS(uri, function() {
                
                modulesCache[uri].loaded = true;
                
                execModules();
            });
        }
    }
    
    function use(paths) {
        var pathArr = isString(paths) ? paths.split(MODULE_SPLITER) : paths;
        
        mainModulesUrl = mainModulesUrl.concat(pathArr);
        
        for(var i = 0, l = pathArr.length, path; i < l; i ++) {
            path = pathArr[i];
            
            request(path);
        }
    }
    
    function require(uri) {
        var module = modulesCache[uri = resolve(uri)];
        var ret = null;
        
        if(!module) {
            throw new Error(uri + '加载失败');
        }
        
        if(module.executed) {
            ret = module.exports;
        } else {
            
            if(isFunction(module.factory)) {
                ret = module.exports = module.factory(require);
            }
        }
        
        return ret;
    }
    
    loader.modulesCache = modulesCache;
    
    global.use = loader.use = use;
    global.define = define;
    global.loader = loader;
    
})(window);