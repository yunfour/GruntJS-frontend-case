define(function(require) {
    var $ = require('$'),
        VScroll = require('components/vScroll/0.0.1/vScroll'),
        Tab = require('components/tab/1.0.1/tab');
    
    var $win = $(window);
    
    var bannerPanel     = $('#J-loginBanner'),
        bannerBd        = bannerPanel.find('div.login-banner-bd'),
        bannerView      = bannerPanel.find('ul.login-banner-lst'),
        bannerCtrlItms  = bannerPanel.find('ul.login-banner-ctrl').children();
    
    var vScrollObj = new VScroll({
        view: bannerView,
        speed: 800,
        scale: bannerBd.width(),
        autoScroll: true,
        autoScrollTimeout: 3000
    });
    
    var setBannerPos = function() {
        var panelWidth  = bannerPanel.width(),
            bannerWidth = bannerBd.width(),
            bannerLeft;
        
        bannerLeft = (panelWidth - bannerWidth) / 2;
        
        bannerBd.css('left', bannerLeft);
    };
    
    var setRate = function(ratePanel) {
        var rateContents    = ratePanel.next(),
            rateContentItms = rateContents.children(),
            rateItms        = ratePanel.children();
        
        var tabObj = new Tab({
            tabItems: rateItms,
            selectedClass: 'com-rate-done'
        });
        
        tabObj.on('change', function() {
            var index = tabObj.getAttr('index');
            
            rateContentItms.hide()
                           .eq(index)
                           .show();
        });
    };
    
    $win.on('resize', function() {
        setBannerPos();
    });
    setBannerPos();
    
    vScrollObj.autoScroll();
    
    vScrollObj.on('scroll', function() {
        var index = vScrollObj.getIndex();
        
        bannerCtrlItms.removeClass('active')
                      .eq(index)
                      .addClass('active');
    });
    
    bannerCtrlItms.click(function() {
        var index = bannerCtrlItms.index(this);
        
        vScrollObj.scrollTo(index);
    });
    
    setRate($('#J-developerRate'));
    setRate($('#J-spreaderRate'));
    
    
    require('./setLogin');
});
