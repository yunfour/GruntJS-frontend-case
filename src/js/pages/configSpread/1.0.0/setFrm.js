// 设置表单的验证、提交切换效果

define(function(require) {
    var $ = require('$');
    
    var Tab = require('components/tab/1.0.1/tab'),
        validateFrm = require('common/validateForm/0.0.1/validateForm');
    
    var theFrm          = $('#J-configSpreadFrm'),
        appLabels       = theFrm.find('input.J-appLabel'),
        appIntro        = $('#appIntro'),
        spreadPrice     = $('#spreadPrice'),
        deadlineRadios  = theFrm.find('input[name=deadline]'),
        deadlineValue   = $('#deadlineValue'),
        targets         = theFrm.find('input[name=targets]'),
        submitBtn       = theFrm.find('input[type=button]');
    
    var validatePlan = {
        'appLabel_1': {
            isShowSuccessTip: false,
            patterns: [
                {
                    pattern: function(val) {
                        var result = false;
                        
                        for(var i = 0, l = appLabels.size(); i < l; i ++) {
                            if($.trim(appLabels.eq(i).val()) !== '') {
                                result = true;
                                break;
                            }
                        }
                        
                        return result;
                    },
                    noMatchTip: '请输入应用标签'
                }
            ]
        },
        'appIntro': {
            isShowSuccessTip: false,
            patterns: [
                {
                    pattern: function(val) {
                        var result = val.length >= 20 && val.length <= 500;
                        
                        return result;
                    },
                    noMatchTip: '应用简介为20-500个中文字符！'
                }
            ]
        },
        'screenshot': {
            isShowSuccessTip: false,
            required: true,
            emptyTip: '请上传应用截图'
        },
        'spreadPrice': {
            isShowSuccessTip: false,
            required: true,
            emptyTip: '请输入推广价格',
            patterns: [
                {
                    pattern: function(val) {
                        var valNum = Number(val),
                            result = true;
                        
                        if(isNaN(valNum)) {
                            result = false;
                        } else if(valNum <= 0) {
                            result = false;
                        }
                        
                        return result;
                    },
                    noMatchTip: '推广价格必须为大于0数值！'
                }
            ]
        },
        'deadline': {
            isShowSuccessTip: false,
            required: true,
            emptyTip: '请选择推广截止方式'
        },
        'deadlineValue': {
            isShowSuccessTip: false,
            required: true,
            emptyTip: '请选输入内容',
            patterns: [
                {
                    pattern: function(val) {
                        var result               = true,
                            deadlineRadioChecked = deadlineRadios.filter(':checked'),
                            valNum               = Number(val);
                        
                        if(deadlineRadioChecked.val() === 'date') {
                            
                        } else if(deadlineRadioChecked.val() === 'total') {
                            if(valNum <= 0 || isNaN(valNum)) {
                                result = false;
                            }
                        }
                        
                        return result;
                    },
                    noMatchTip: '格式不正确'
                }
            ]
        },
        'targets': {
            isShowSuccessTip: false,
            required: true,
            emptyTip: '请选择用户激活指标'
        }
    };
    
    function getFrmInfo() {
        var info = {};
        
        var appLabelsArr = [];
        appLabels.each(function(i) {
            var label = appLabels.eq(i),
                val = $.trim(label.val());
            
            if(val !== '') {
                appLabelsArr.push(encodeURIComponent(val));
            }
        });
        info.appLabel = appLabelsArr.join(';');
        
        info.appIntro = encodeURIComponent($.trim(appIntro.val()));
        
        info.spreadPrice = encodeURIComponent($.trim(spreadPrice.val()));
        
        info.deadline = deadlineRadios.filter(':checked').val();
        info.deadlineVal = deadlineValue.val();
        
        info.targets = targets.filter(':checked').val();
        
        return {};
    }
    
    deadlineRadios.on('click', function() {
        var val = $(this).val();
        
        validateFrm.valiFn(deadlineRadios, validatePlan.deadline);
        
        if(val === 'date') {
            validateFrm.valiFn(deadlineValue, validatePlan.deadlineValue);
        } else {
            validateFrm.valiFn(deadlineValue, validatePlan.deadlineValue);
        }
    });
    
    // 监听表单提交
    submitBtn.on('click', function() {
        function isVali() {
            var flag = true,
                valiResult = validateFrm.isPassVali(theFrm, validatePlan);
            
            if(!valiResult.isPass) {
                // 如果表单验证没有通过，则去主动验证一次
                validateFrm.goVali(theFrm, validatePlan);
                
                valiResult = validateFrm.isPassVali(theFrm, validatePlan);
            }
            
            return valiResult.isPass;
        }
        
        if(submitBtn.hasClass('com-btn-disable')) {
            return false;
        }
        
        validateFrm.showExplain(submitBtn, false);
        
        if(isVali()) {
            
            submitBtn.addClass('com-btn-disable').val('提交中...');
            
            $.post(
                'jsp/submitConfigSpread.jsp',
                getFrmInfo(),
                function(data) {
                    submitBtn.removeClass('com-btn-disable').val('提交');
                    
                    if(data.status !== '1') {
                        validateFrm.showExplain(submitBtn, true, 'warn', data.message);
                    } else {
                        validateFrm.showExplain(submitBtn, true, 'success', '提交成功');
                        
                        //location.href = 'dev-submit-app-success.html';
                    }
                },
                'JSON'
            );
            
        } else {
            validateFrm.showExplain(submitBtn, true, 'warn', '请按要求完善以上信息');
        }
     
        
        return false;
    });
});
