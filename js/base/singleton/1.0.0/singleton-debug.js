/*
 * 函数: singleton(obj, init)
 * 
 * 作用: 单例模式的实现，向该函数传递一个对象，该函数返回一个function，
 *       该function在所有地方执行后的返回结果都是同一个对象
 * 
 * 参数:
 *      obj : 目标对象
 * 
 * 返回值: function类型；返回一个函数，该函数在任何地方执行都会返回
 *        同一个对象
 */
define("base/singleton/1.0.0/singleton-debug", [], function(require) {
    function singleton(obj) {
        var singletonObj = obj || {};
        return function() {
            return singletonObj;
        };
    }
    return singleton;
});