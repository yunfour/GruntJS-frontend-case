define(function(require) {
    require('./b.js');
    var d = require('./d.js');
    
    console.log(d);
    
    return {
        name: 'aaaaaa'
    };
});
