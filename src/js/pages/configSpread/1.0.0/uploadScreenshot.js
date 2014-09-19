// 设置上传应用截图效果

define(function(require) {
    var $ = require('$');
    
    var Upload = require('gallery/upload/1.1.1/upload'),
        Tip = require('components/tip/0.0.1/tip'),
        Progress = require('components/progress/0.0.1/progress'),
        tools  = require('common/tools/0.0.1/tools');
    
    var uploadTipObj,
        uploadTipObjTimer;
    
    var screenshotLst   = $('#J-screenshotLst'),
        screenshotItms  = screenshotLst.children('li'),
        screenshotField = $('#screenshot');
    
    // 验证选中的图片是否合法
    function validateImg(files) {
        var result = {
            isPass: true
        };
        
        for(var i = 0, l = files.length, theFile; i < l; i ++) {
            theFile = files[i];
            
            if(!tools.isImgType(files[i].name)) {
                // 选择文件的格式不符合
                result.isPass = false;
                result.message = '请选择格式为JPG,PNG,GIF的文件';
                
                return result;
            }
            
            if(theFile.size && theFile.size > 100 * 1000) {
                // 选择文件的格式不符合
                result.isPass = false;
                result.message = '文件大小不能超过500k';
                
                return result;
            }
        }
        
        return result;
    }
    
    // 显示气泡提示
    function showTip(isShow, screenshotItm, tipText) {
        if(!uploadTipObj) {
            uploadTipObj = new Tip({
                theme: 'red',
                arrowPosition: 6
            });
        }
        
        if(uploadTipObjTimer) {
            window.clearTimeout(uploadTipObjTimer);
        }
        
        if(isShow) {
            var offset = screenshotItm.offset();
            
            //tipText = '<div style="width:175px">' + tipText + '</div>';
            
            uploadTipObj.setTipText(tipText)
                        .setPosition(offset.left + 47, offset.top - 2)
                        .show();
            
            uploadTipObjTimer = window.setTimeout(function() {
                uploadTipObj.hide();
            }, 3000);
            
        } else {
            uploadTipObj.hide();
        }
    }
    
    // 展示上传中的效果
    function showUploading(screenshotItm, percent) {
        var loadingLabel = screenshotItm.find('div.uploading');
        
        if(loadingLabel.size() === 0) {
            loadingLabel = $('<div class="uploading"></div>').appendTo(screenshotItm);
        }

        loadingLabel.html('上传中 ' + percent + '%');
        
        loadingLabel.show();
    }
    
    // 上传成功
    function uploadSuccess(screenshotItm, imgUrl) {
        var loadingLabel = screenshotItm.find('div.uploading'),
            imgPanel = screenshotItm.find('div.img-panel');
        
        loadingLabel.hide();

        if(imgPanel.size() === 0) {
            imgPanel = $('<div class="img-panel"><img src="' + imgUrl + '" alt="应用截图"><a href="javascript:;" class="img-del-btn">x</a></div>');
            
            loadingLabel.before(imgPanel);
        } else {
            imgPanel.find('img').attr('src', imgUrl);
        }
        
        screenshotItm.removeClass('bordered');
        
        imgPanel.show();
    }
    
    screenshotItms.each(function(i) {
        var screenshotItm = $(this),
            progressObj = new Progress();
        
        var uploader = new Upload({
            trigger : screenshotItm,
            name    : 'screenshot',
            action  : './jsp/uploadScreenshot.jsp',
            accept  : 'image/*',
            multiple: false,
            data    : {
                index: i,
                r: Math.random()
            },
            change  : function(files) {
                
                var validateResult = validateImg(files);
                
                if(validateResult.isPass) {
                    
                    uploader.submit();
                    uploaderFrm.hide();
                    progressObj.start();
                    
                } else {
                    showTip(true, screenshotItm, validateResult.message);
                    
                    return false;
                }
                
            },
            error   : function(files) {
                // 刷新input
                uploader._uploaders[0].refreshInput();
                progressObj.stop();
                
                showTip(true, screenshotItm, '上传文件出错，请重试');
                screenshotItm.data('uploaderFrm').show();
            },
            success : function(response) {
                var result = $.parseJSON(response),
                    screenshotImgArr = screenshotField.val().split(';');
                
                uploader._uploaders[0].refreshInput();
                
                progressObj.finish().stop();
                
                if(result.status === '1') {
                    uploadSuccess(screenshotItm, result.data);
                    screenshotImgArr[i] = encodeURI(result.data);
                    
                    screenshotField.val(screenshotImgArr.join(';'));
                    
                } else {
                    
                    showTip(true, screenshotItm, '上传文件出错，请重试');
                    screenshotItm.data('uploaderFrm').show();
                    
                }
                
            },
            progress: function(event, position, total, percent, files) {
                
            }
        });
        
        var uploaderFrm = uploader._uploaders[0].form;
        
        progressObj.on('progress', function() {
            var percent = parseInt(progressObj.getProgress(), 10);
            
            showUploading(screenshotItm, percent);
        }).on('finish', function() {
            screenshotItm.find('div.uploading').hide();
        }).on('stop', function() {
            screenshotItm.find('div.uploading').hide();
        });
        
        screenshotItm.data({
            uploader: uploader,
            uploaderFrm: uploaderFrm
        });
        
        if(screenshotItm.find('div.img-panel img').size()) {
            uploaderFrm.hide();
        }
    });
    
    screenshotLst.delegate('a.img-del-btn', 'click', function() {
        var delImgBtn     = $(this),
            screenshotItm = delImgBtn.closest('li'),
            imgPanel      = screenshotItm.find('div.img-panel'),
            uploaderFrm   = screenshotItm.data('uploaderFrm');
        
        screenshotItm.addClass('bordered');
        uploaderFrm.show();
        imgPanel.remove();
    });
});
