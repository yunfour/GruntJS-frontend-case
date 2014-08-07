define(function(require) {
    var $ = require('$');    
    
    var validateFrm = require('common/validateForm/0.0.1/validateForm');
    
    var theFrm    = $('#J-submitAppFrm'),
        imgUrl    = $('#imgUrl'),
        appName   = $('#appName'),
        kitName   = $('#kitName'),
        appType   = $('#appType'),
        submitBtn = theFrm.find('input[type=submit]');
    
    var validatePlan = {
        'imgUrl': {
            required: true,
            emptyTip: '请上传图标！'
        },
        'appName': {
            required: true,
            emptyTip: '请输入应用名称！'
        },
        //'kitName': {
        //    required: true,
        //    emptyTip: '请输入包名称！'
        //},
        'appType': {
            patterns: [
                {
                    pattern: function(val) {
                        var result = val !== 'null';
                        
                        return result;
                    },
                    noMatchTip: '请选择应用类型'
                }
            ]
        }
    };
    
    // 采集表单数据
    function getFrmInfo() {
        return {
            imgUrl  : encodeURIComponent($.trim(imgUrl.val())),
            appName : encodeURIComponent($.trim(appName.val())),
            kitName : encodeURIComponent($.trim(kitName.val())),
            appType : encodeURIComponent($.trim(appType.val())),
        };
    }
    
    // 当表单中的字段失去焦点时，则去验证该字段的值
    theFrm.delegate('input', 'blur', function() {
        var theField = $(this),
            fieldName = theField.attr('name');
            
        validateFrm.valiFn(this, validatePlan[fieldName]);
    });
    
    // 当表单中的字段失去焦点时，则去验证该字段的值
    appType.on('change', function() {
        var theField = appType,
            fieldName = theField.attr('name');
            
        validateFrm.valiFn(this, validatePlan[fieldName]);
    });
    
    // 监听表单提交
    theFrm.on('submit', function() {
        var isVali = function() {
            var flag = true,
                valiResult = validateFrm.isPassVali(theFrm, validatePlan);
            
            if(!valiResult.isPass) {
                // 如果表单验证没有通过，则去主动验证一次
                validateFrm.goVali(theFrm, validatePlan);
                
                valiResult = validateFrm.isPassVali(theFrm, validatePlan);
            }
            
            return valiResult.isPass;
        };
        
        if(submitBtn.hasClass('com-btn-disable')) {
            return false;
        }
        
        validateFrm.showExplain(submitBtn, false);
        
        if(isVali()) {
            
            submitBtn.addClass('com-btn-disable').val('保存中...');
            
            $.post(
                'jsp/submitApp.jsp',
                getFrmInfo(),
                function(data) {
                    submitBtn.removeClass('com-btn-disable').val('修改');
                    
                    if(data.status !== '1') {
                        validateFrm.showExplain(submitBtn, true, 'warn', data.message);
                    } else {
                        validateFrm.showExplain(submitBtn, true, 'success', '修改成功');
                        
                        location.href = 'dev-submit-app-success.html';
                    }
                },
                'JSON'
            );
            
        }
        
        return false;
    });
});
