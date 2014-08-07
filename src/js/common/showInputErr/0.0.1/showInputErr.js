define(function(require) {
    var $ = require('$');
    var showInputErr = function(field, isShow, errTxt) {
        var panel   = field.closest('div.controls'),
            errEle  = panel.find('span.com-form-err'),
            tipEle  = panel.find('span.com-form-tip');
        
        if(errEle.size() === 0) {
            errEle = $('<span class="help-block com-form-err"></span>');
            errEle.appendTo(panel);
        }
        
        if(isShow) {
            errEle.show().text(errTxt);
            tipEle.hide();
        } else {
            errEle.hide();
            tipEle.show();
        }
    };
    
    return showInputErr;
});
