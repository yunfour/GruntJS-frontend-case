var createClass = function(properties) {
    // 构造函数的原型对象
    var fn;
    
    // 所有的方法
    var methods      = properties.methods,
        superClasses = properties.superClass;
    
    // 定义构造函数
    var Constructor = function() {
        var that       = this,
            
            // 私有属性对象（集合）
            attrs;
        
        // 判断是否设置了父类
        if(superClasses && superClasses.constructor === Array) {
            
            for(var i = 0, l = superClasses.length, superClasse; i < l; i ++) {
                superClass = superClasses[i];
                
                // 继承父类的构造函数
                if(typeof superClass === 'function') {
                    superClass.apply(that, arguments);
                }
            }
        }
        
        
        if(typeof that.getAttr === 'function') {
            
            // 获取父类的私有属性集合
            attrs = that.getAttr();
            
        }
        
        // 方法:添加属性
        that.setAttr = function(attrName, attrVal) {
            var that    = this,
                attrObj = {};
            
            if(!attrs || typeof attrs !== 'object') {
                attrs = {};
            }
            
            if(typeof attrName === 'object') {
                attrObj = attrName;
            } else if(typeof attrName === 'string') {
                attrObj[attrName] = attrVal;
            }
            
            if(attrObj) {
                for(var key in attrObj) {
                    if(attrObj.hasOwnProperty(key)) {
                        attrs[key] = attrObj[key];
                    }
                }
            }
            
            return that;
        };
        
        // 方法:获取属性值
        that.getAttr = function(attrName) {
            var that = this,
                attrVal;
            
            if(arguments.length === 0) {
                
                // 如果没有设置任何参数，则将attrs对象（所有属性集合）返回
                attrVal = attrs;
                
            } else {
                
                if(typeof attrName !== 'string') {
                    throw new Error('方法 getAttr() 的参数 attrName 必须为字符串类型');
                }
                
                if(typeof attrs === 'object') {
                    attrVal = attrs[attrName];
                }
                
            }
            
            return attrVal;
        };
        
        // 调用初始化方法
        if(typeof properties.init === 'function') {
            properties.init.apply(that, arguments);
        }
    };
    
    // 缓存构造函数的原型对象
    fn = Constructor.fn = Constructor.prototype;
    
    
    if(typeof superClasses === 'function') {
        superClasses = [superClasses];
    }
    
    if(superClasses && superClasses.constructor === Array) {
        
        // 遍历父类列表，实现多继承
        for(var i = 0, l = superClasses.length, superClass, subClass, subObj; i < l; i ++) {
            
            superClass = superClasses[i];
            
            if(typeof superClass !== 'function') {
                continue;
            }
            
            subClass = function() {};
            subClass.prototype = superClass.prototype;
            subObj = new subClass(); 
            
            
            /*
             * 将列表中第一个父类设置成直接父类（通过instanceOf运算符可以判
             * 断出继承关系），而当前类之使用（继承）出第一个之外的其他类的属
             * 性（属性和方法），因此使用instanceOf运算符判断当前类的实例和
             * 第一个类的关系式会得到true的结果，而与其他类运算的结果则问false
             * 如：obj为当前对象的实例，
             * 则：
             *    obj instanceOf superClasses[0] 的结果为true
             *    obj instanceOf superClasses[1+] 的结果为false
             */
            if(i === 0) {
                
                Constructor.prototype = subObj;
                
                Constructor.prototype.superClass = superClass;
                
            } else {
                
                for(var k in subObj) {
                    Constructor.prototype[k] = subObj[k];
                }
                
            }
            
        }
        
    } else {
        Constructor.prototype.superClass = Object;
    }
    
    
    if(methods && typeof methods === 'object') {
        // 遍历：methods，将遍历得到的函数，追加至构造函数的原型对象中
        for(var key in methods) {
            if(typeof methods[key] === 'function' && methods.hasOwnProperty(key)) {
                fn[key] = methods[key];
            }
        }
    }
    
    // 返回构造函数
    return Constructor;
};

var A = createClass({
    init: function() {
        var that = this;
        
        that.setAttr('name', 'haiyun');
    },
    methods: {
        showName: function() {
            console.log(this.getAttr('name'));
        }
    }
});
var B = createClass({
    init: function() {
        this.setAttr('sex', 'man');
    },
    methods: {
        showSex: function() {
            console.log(this.getAttr('sex'));
        }
    }
});
var X = createClass({
    init: function() {
        this.setAttr('xx', 'xx');
    },
    methods: {
        showX: function() {
            console.log(this.getAttr('xx'));
        }
    }
});
var C = createClass({
    init: function() {
        this.showName();
    },
    superClass: [A, B, X]
});

var a = new A();

a.showName();

var b = new B();
b.showSex();

var c = new C();
c.showName();
c.showSex();
c.showX();

console.log(b instanceof B);
console.log(b instanceof A);
console.log(c instanceof A);
console.log(c instanceof B);