(function() {
    
    var scripts = document.getElementsByTagName('script');
    
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
    
    console.log(scripts.length);
    
    for(var i = 0, l = scripts.length, src; i < l; i ++) {
        
        src = getScriptAbsoluteSrc(scripts[i]);
        
        console.log(i + ':' + src);
        console.log('readyState:' + scripts[i].readyState);
        
    }
    
    console.log(getScriptAbsoluteSrc(scripts[scripts.length - 1]));
    
})();