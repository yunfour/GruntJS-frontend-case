define(function(require) {
    var Dialog = require('components/dialog/1.0.0/dialog'),
        $ = require('$');
    
    var editAccountAuthDialog = function(managerId, callback) {
        var dialogContentEle = $([
            '<form style="padding:20px 40px;">',
                '<fieldset>',
                    '<label>选择管理级别</label>',
                    '<div class="controls">',
                        '<select>',
                            '<option value="0">超级管理员</option>',
                            '<option value="1">系统管理员</option>',
                            '<option value="2">普通管理员</option>',
                        '</select>',
                    '</div>',
                    
                    '<div class="controls" style="padding: 10px 0 0;">',
                        '<input type="button" class="btn" value=" 确  定 " />',
                    '</div>',
                '</fieldset>',
            '<form>'
        ].join(''));
        
        var dialog = new Dialog({
            title: '设置账户权限',
            width: 400,
            content: dialogContentEle
        });
        
        var authLst    = dialogContentEle.find('select'),
            confirmBtn = dialogContentEle.find('input.btn');
        
        var setAuth = function(id, auth) {
            $.post(
                'yb/setAccoutAuth',
                {
                    managerId: id,
                    auth: auth
                },
                function(data) {
                    if(typeof callback === 'function') {
                        callback(data);
                    }
                },
                'JSON'
            );
        };
        
        confirmBtn.click(function() {
            setAuth(managerId, authLst.val());
            dialog.hide();
        });
        
        dialog.show();
    };
    
    return editAccountAuthDialog;
});
