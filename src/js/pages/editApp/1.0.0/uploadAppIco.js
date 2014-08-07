define(function(require) {
    var $ = require('$'),
        Upload = require('gallery/upload/1.1.1/upload');
    
    var Tip = require('components/tip/0.0.1/tip');
    
    var uploadIcoBtn  = $('#J-uploadIcoBtn'),
        selectIcoBtn  = $('#J-selectIcoBtn'),
        uploadExplain = $('#J-uploadExplain');
    
    var imgUrl = $('#imgUrl');
    
    var selectedFiles = [];
    
    var uploader = new Upload({
        trigger: selectIcoBtn,
        name: 'appImg',
        action: './jsp/uplaodAppPic.jsp',
        accept: 'image/*',
        multiple: false,
        data: {
            //r: Math.random()
        },
        change: function(files) {
            
            showUploadTip(selectIcoBtn, false);
            selectedFiles = [];
            imgUrl.val('');
            
            for(var i = 0, l = files.length, theFile; i < l; i ++) {
                theFile = files[i];
                
                if(!isImgType(files[i].name)) {
                    // 选择文件的格式不符合
                    showUploadTip(selectIcoBtn, true, '请选择格式为JPG,PNG,GIF的文件');
                    return false;
                }
                if(theFile.size && theFile.size > 500 * 1000) {
                    // 选择文件的格式不符合
                    showUploadTip(selectIcoBtn, true, '文件大小不能超过500k');
                    return false;
                }
            }
            
            selectedFiles = files;
        },
        error: function(files) {
            
            uploadIcoBtn.removeClass('com-btn-disable');
            showUploadExplain(true, 'warn', '上传出错，请重试');
            
        },
        success: function(response) {
            
            var result = $.parseJSON(response);
            
            uploadIcoBtn.removeClass('com-btn-disable');
            
            if(result.status === '1') {
                
                showUploadExplain(true, 'success', '上传成功');
                imgUrl.val(result.imgUrl);
                selectIcoBtn.html('<img src="' + result.imgUrl + '" width="125" height="125" style="border-radius: 5px;" />');
                
            } else {
                showUploadExplain(true, 'warn', result.message);
            }
            
        },
        progress: function(event, position, total, percent, files) {
            
        }
    });
    
    var uploadTipObj;
    
    // 判断文件名是否为图片格式的文件名
    function isImgType(fileName) {
        var isImg = /\.(jpg|jpeg|gif|png)$/i.test(fileName);
        
        return isImg;
    }
    
    // 显示气泡提示
    function showUploadTip(ele, isShow, tipText) {
        if(!uploadTipObj) {
            uploadTipObj = new Tip({
                theme: 'red',
                arrowPosition: 7
            });
        }
        
        if(isShow) {
            var offset = ele.offset();
            
            tipText = '<div style="width:175px">' + tipText + '</div>';
            
            uploadTipObj.setTipText(tipText)
                        .setPosition(offset.left + 59, offset.top - 2)
                        .show();
        } else {
            uploadTipObj.hide();
        }
    }
    
    // 显示上传按钮旁边的提示
    function showUploadExplain(isShow, type, explainText) {
        var icoEle = uploadExplain.find('i.com-form-ico'),
            tipEle = uploadExplain.find('span');
        var icoClass = 'com-ico com-form-ico com-form-ico-';
        
        if(isShow) {
            
            uploadExplain.removeClass('com-form-explain-warn')
                         .show();
            
            icoClass = icoClass + type;
            
            icoEle.removeClass()
                  .addClass(icoClass);
            
            tipEle.html(explainText);
            
        } else {
            uploadExplain.hide();
        }
    }
    
    uploadIcoBtn.on('click', function() {
        if(uploadIcoBtn.hasClass('com-btn-disable')) {
            return false;
        }
        
        if(selectedFiles.length === 0) {
            // 未选择文件
            showUploadTip(uploadIcoBtn, true, '请选择图标文件');
            return false;
        }
        
        uploadIcoBtn.addClass('com-btn-disable');
        
        uploader.submit();
        showUploadExplain(true, 'loading', '正在上传中...');
        
        selectedFiles = [];
    });
});
