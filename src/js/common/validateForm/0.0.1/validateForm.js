define(function(require) {
    var $ = require('$');
    
    // 显示字段提示
    var showExplain = function(theField, isShow, type, explainTxt) {
        var field       = $(theField),
            fieldPanel  = field.closest('.com-form-item'),
            explainEle  = fieldPanel.find('.com-form-explain'),
            isBlock     = explainEle.hasClass('com-form-explain-block');
        
        explainTxt = explainTxt || '&nbsp;';
        
        if(explainEle.size() === 0) {
            explainEle = $('<div class="com-form-explain com-form-explain-hasIco"></div>');
            explainEle.appendTo(fieldPanel);
        } else {
            explainEle.removeClass()
                      .addClass('com-form-explain com-form-explain-hasIco');
            
            if(isBlock) {
                explainEle.addClass('com-form-explain-block');
            }
        }
        
        if(isShow) {
            explainEle.show();
            
            if(type === 'explain') {
                explainEle.html('<i class="com-ico com-form-ico com-form-ico-explain"></i><span>' + explainTxt + '</span>');
            } else if(type !== '') {
                explainEle.addClass('com-form-explain-' + type)
                          .html('<i class="com-ico com-form-ico com-form-ico-' + type + '"></i><span>' + explainTxt + '</span>');
            }
        } else {
            explainEle.hide();
        }
    };
    
    // 显示字段的默认提示
    var showDefaultTip = function(theField, defaultTip) {
        var field     = $(theField),
            fieldName = field.attr('name'),
            fieldVal  = $.trim(field.val());
        
        if(fieldVal === '' && defaultTip) {
            showExplain(field, true, 'explain', defaultTip);
        }
    };
    
    // 根据设定的验证方案验证指定的字段
    var valiFn = function(theField, valiObj, callback) {
        var field       = $(theField),
            fieldName   = field.attr('name'),
            fieldVal    = $.trim(field.val()),
            fieldType   = (field.attr('type') || '').toLowerCase(),
            fieldTagName= field.prop('tagName').toLowerCase(),
            fieldPanel  = field.closest('div.com-form-item'),
            theForm     = field.closest('form'),
            errNum      = 0,
            patterns;
        var isShowSuccessTip;
        
        if(!valiObj) {
            return;
        }
        
        if(typeof valiObj.isShowSuccessTip === 'undefined') {
            isShowSuccessTip = true;
        } else {
            isShowSuccessTip = !!valiObj.isShowSuccessTip;
        }
    
        field.data('is_pass_validate', 'false');
        showExplain(field, false);
        
        // 非空验证
        if(!!valiObj.required) {
            if(
                fieldType    === 'text' ||
                fieldType    === 'password' ||
                fieldType    === 'hidden' ||
                fieldTagName === 'textarea' ||
                fieldTagName === 'select'
            ) {
                if(fieldVal === '') {
                    showExplain(field, true, 'err', valiObj.emptyTip || '该字段不能为空！');
                    errNum ++;
                }
            } else if(
                fieldType === 'radio' || 
                fieldType === 'checkbox'
            ) {
                var checkedFields = theForm.find('input[name=' + fieldName + ']:checked');
                
                if(checkedFields.size() === 0) {
                    showExplain(field, true, 'err', valiObj.emptyTip || '该字段不能为空！');
                    errNum ++;
                }
            }
        }


        // 字段对比验证（使用场景：验证确认密码是否和密码一致）
        if(errNum === 0 && valiObj.compare) {
            var compareField    = theForm.find('input[name=' + valiObj.compare.fieldName + '],textarea[name=' + valiObj.compare.fieldName + ']').eq(0),
                compareFieldVal = $.trim(compareField.val());
            
            if(compareField.size()) {
                if(!valiObj.compare.compareFn(fieldVal, compareFieldVal)) {
                    showExplain(field, true, 'err', valiObj.compare.failedTip || '');
                    errNum ++;
                }
            }
        }
        
        // 正则验证
        patterns = valiObj.patterns;
        if(errNum === 0 && patterns && patterns.constructor === Array) {
            var reg,
                noMatchTip,
                patternObj,
                pattern;
            
            for(var i = 0, l = patterns.length; i < l; i ++) {
                patternObj  = patterns[i];
                pattern     = patternObj.pattern;
                noMatchTip  = patternObj.noMatchTip || '你输入的内容格式有误！';
                
                if(pattern.constructor === RegExp) {
                    pattern = function(val) {
                        return patternObj.pattern.test(val);
                    };
                }
                
                if(!pattern(fieldVal)) {
                    showExplain(field, true, 'err', noMatchTip);
                    errNum ++;
                    break;
                }
            }
        }
        
        
        // ajax（异步）验证
        if(errNum === 0 && valiObj.asyncVali) {
            var valiXhr   = field.data('valiXhr'),
                asyncVali = valiObj.asyncVali,
                url       = asyncVali.url;
            
            var params = {};
            
            params.fieldName = asyncVali.name || fieldName;
            params.fieldVal  = encodeURIComponent(fieldVal);
            params._r        = Math.random();
            
            if(valiXhr && valiXhr.abort) {
                valiXhr.abort();
            }
            
            showExplain(field, true, 'loading', '');
            field.data('is_pass_validate', 'asyncValidating');
            
            valiXhr = $.getJSON(
                url,
                params,
                function(data) {
                    var isPass = data.status === '1';
                    
                    if(isPass) {
                        
                        if(isShowSuccessTip) {
                            showExplain(field, true, 'success', asyncVali.successTip || valiObj.successTip || '');
                        }
                        
                        field.data('is_pass_validate', 'true');
                    } else {
                        showExplain(field, true, 'err', data.message || '');
                        field.data('is_pass_validate', 'false');
                    }
                    
                    if(typeof callback === 'function') {
                        callback(isPass, data);
                    }
                }
            );
            field.data('valiXhr', valiXhr);
        }
        
        
        if(errNum !== 0) {
            
            field.data('is_pass_validate', 'false');
            
            if(typeof callback === 'function') {
                callback(false);
            }

        } else if(!valiObj.asyncVali) {
            
            // 全部验证通过则显示成功的提示
            if(isShowSuccessTip) {
                showExplain(field, true, 'success', valiObj.successTip || '');
            }
            
            field.data('is_pass_validate', 'true');
            
            if(typeof callback === 'function') {
                callback(true);
            }
        }
    };
    
    // 判断指定表单是否通过指定方案的验证操作
    var isPassVali = function(theFrm, validPlan) {
        var notPassFieldsName = [],
            isPass            = false,
            field,
            valiState;
        
        for(var k in validPlan) {
            valiState = false;
            
            if(validPlan.hasOwnProperty(k)) {
                field = theFrm.find('[name=' + k + ']').eq(0);
                
                if(field.size()) {
                    valiState = field.data('is_pass_validate');
                    
                    if(valiState !== 'true') {
                        notPassFieldsName.push(k);
                    }
                }
            }
        }
        
        return {
            isPass: notPassFieldsName.length === 0,
            notPassFieldsName: notPassFieldsName
        };
    };
    
    // 按照设定的验证的方案去验证指定的表单
    var goVali = function(theFrm, valiPlan) {
        var notPassFieldsName = [],
            field;
        
        for(var k in valiPlan) {
            
            if(valiPlan.hasOwnProperty(k)) {
                field = theFrm.find('[name=' + k + ']').eq(0);
                
                if(field.size() && field.data('is_pass_validate') !== 'true') {
                    valiFn(field, valiPlan[k]);
                }
            }
        }
    };
    
    return {
        showExplain     : showExplain,
        showDefaultTip  : showDefaultTip,
        valiFn          : valiFn,
        isPassVali      : isPassVali,
        goVali          : goVali
    };
});
