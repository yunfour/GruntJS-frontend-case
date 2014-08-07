define(function(require) {
    var $ = require('$');
    
    var ToolTip = require('components/toolTip/0.0.1/toolTip'),
        VScroll = require('components/vScroll/0.0.1/vScroll');
    
    var spreadAppBtn    = $('#J-spreadAppBtn'),
        appId           = spreadAppBtn.attr('data-appid'),
        screenshotPanel = $('#J-screenshotLst'),
        screenshotLst   = screenshotPanel.find('ul'),
        screenshotItms  = screenshotLst.children('li');
    
    var tip = new ToolTip({
        trigger: spreadAppBtn,
        arrowPosition: 12
    });
    
    var vScrollOfScreenshot = new VScroll({
        view: screenshotLst,
        speed: 350,
        scale: 260
    });
    
    function spreadApp(appId, callback) {
        $.post(
            'jsp/spreadApp.jsp',
            {
                appId: appId
            },
            function(data) {
                if(typeof callback === 'function') {
                    callback(data);
                }
            },
            'JSON'
        );
    }
    
    spreadAppBtn.on('click', function() {
        
        if(spreadAppBtn.data('spreaded') === 'true') {
            tip.setTipText('您已在推广此应用，不能重复添加')
               .setTheme('red')
               .temporaryShow(3000);
               
            return false;
        }
        
        if(spreadAppBtn.data('ajaxlock') === 'true') {
            return false;
        }
        
        spreadAppBtn.data('ajaxlock', 'true');
        
        spreadApp(appId, function(data) {
            spreadAppBtn.data('ajaxlock', 'false');
            
            if(data.status === '1') {
                spreadAppBtn.data('spreaded', 'true');
                
                tip.setTipText('已添加至“推广应用记录”')
                   .setTheme('green')
                   .temporaryShow(3000);
            } else {
                tip.setTipText(data.message)
                   .setTheme('red')
                   .temporaryShow(3000);
            }
        });
    });

    screenshotPanel.delegate('a.inside-screenshot-pager', 'click', function() {
        var pagerBtn = $(this),
            index    = vScrollOfScreenshot.getIndex();
        
        if(pagerBtn.hasClass('inside-screenshot-pager-pre')) {
            index = index - 1;
        } else {
            index = index + 1;
        }
        
        if(index <= 0) {
            index = 0;
        }
        
        if(index > screenshotItms.size() - 2) {
            return;
        }
        
        vScrollOfScreenshot.scrollTo(index);
    });
});
