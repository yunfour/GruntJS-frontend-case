define(function(require) {
    var CONFIG_DATA = require('pages/config/1.0.0/config');
    
    var $       = require('$'),
        store   = require('gallery/store/1.3.16/store'),
        Timeout = require('components/timeout/0.0.1/timeout'),
        Tip     = require('components/tip/0.0.1/tip');
    
    var loginFrm     = $('#J-loginFrm'),
        userEmail    = loginFrm.find('input[name=userEmail]'),
        password     = loginFrm.find('input[name=password]'),
        checkCode    = loginFrm.find('input[name=checkCode]'),
        checkCodeImg = $('#J-loginFrmChkCode'),
        loginBtn     = $('#J-loginBtn'),
        loginLoading = false;
    
    // 登录超时器：用来处理异步登录是超时的情况
    var loginTimeouter = new Timeout(5000),
        loginXhr       = null;
    
    // 显示/隐藏 表单字段的错误提示
    var showErr = function(isShow, field, errTxt) {
        var label     = field.prev(),
            errTipObj = field.data('errTipObj'),
            offset    = field.offset(),
            left      = offset.left + (field.outerWidth() / 2) + 15,
            top       = offset.top - 3;
            
        if(!errTipObj) {
            errTipObj = new Tip({
                theme: 'red',
                arrowPosition: 6
            });
            
            field.data('errTipObj', errTipObj);
        }
    
        if(isShow) {
            if(field.attr('name') === 'checkCode') {
                left = left - 16;
            }
            
            errTipObj.setTipText('<div style="width: 120px; text-align: center;">' + errTxt + '</div>')
                     .setPosition(left, top)
                     .show();
        } else {
            errTipObj.hide();
        }
    };
    
    // 验证登录表单数据
    var valid = function() {
        
        showErr(false, userEmail);
        showErr(false, password);
        showErr(false, checkCode);
        
        if($.trim(userEmail.val()) === '') {
            showErr(true, userEmail, '请输入邮箱地址');
            return false;
        } else if(!CONFIG_DATA.regExp.email.test($.trim(userEmail.val()))) {
            showErr(true, userEmail, '邮箱格式不正确 ');
            return false;
        }
        
        if($.trim(password.val()) === '') {
            showErr(true, password, '请输入用户密码 ');
            return false;
        }
        
        if($.trim(checkCode.val()) === '') {
            showErr(true, checkCode, '请输入验证码 ');
            return false;
        } else if($.trim(checkCode.val()).length < 4) {
            showErr(true, checkCode, '验证码为4个字符');
            return false;
        }
        
        return true;
    };
    
    // 锁定/解锁登录按钮
    var lockSubmitBtn = function(isLock) {
        isLock = !!isLock;
        
        if(isLock) {
            loginLoading = true;
            submitBtn.text('正在登录...').addClass('disabled');
        } else {
            loginLoading = false;
            submitBtn.text('登 录').removeClass('disabled');
        }
    };
    
    // 采集数据
    var getInfo = function() {
        var data = {};
        
        data.userName = $.trim(userName.val());
        data.password = $.trim(password.val());
        data.checkCode = $.trim(checkCode.val());
        data.r = Math.random();
        
        return data;
    };
    
    loginBtn.on('click', function() {
        if(loginLoading) {
            return;
        }
        
        if(valid()) {
            
            lockSubmitBtn(true);
            loginTimeouter.stop();
            loginTimeouter.on('timeout', function() {
                lockSubmitBtn(false);
                
                console.log('登录超时！');
            });
            
            loginTimeouter.start();
            
            // 通过ajax提交登录信息
            loginXhr = $.post(
                'ajax/login',
                getInfo(),
                function(data) {
                    lockSubmitBtn(false);
                    
                    loginTimeouter.stop();
                    console.log("登录成功！");
                },
                'JSON'
            );
        }
        
        return false;
    });
    
    checkCodeImg.on('click', function() {
        var src = checkCodeImg.attr('src');
        
        checkCodeImg.attr('src', src + '?');
    });
});