define(function(require) {
    var $ = require('$');
    
    // 常用的工具和函数
    var tools = {};
    
    // 函数：判断文件名是否为图片格式（jpg、jpeg、git、png）
    tools.isImgType = function(fileName) {
        var isImg = /\.(jpg|jpeg|gif|png)$/i.test(fileName);
        
        return isImg;
    };
    
    // 函数：保留小数位
    tools.decimalPlace = function(theNum, digit) {
        digit  = parseInt(digit, 10);
        
        if(isNaN(Number(theNum))) {
            throw new Error('参数 theNum 必须为数字');
        }
        
        if(isNaN(digit) || digit < 0) {
            throw new Error('参数 digit 必须为大于0的数字');
        }
        
        theNum = theNum + '';
        
        if(theNum.indexOf('.') !== -1) {
            var splitArr     = theNum.split('.'),
                decimalPlace = splitArr[1],
                zeroFillNum  = digit - decimalPlace.length;
            
            if(digit === 0) {
                theNum = splitArr[0];
            } else {
                if(zeroFillNum > 0) {
                
                    // 补0
                    for(; zeroFillNum > 0; zeroFillNum --) {
                        decimalPlace = decimalPlace + '0';
                    }
                    
                    decimalPlace = '.' + decimalPlace;
                    
                } else {
                    
                    // 截取
                    decimalPlace = '.' + decimalPlace.substring(0, digit);
                    
                }
                
                theNum = splitArr[0] + decimalPlace;
            }
        }
        
        return theNum;
    };
    
    return tools;
});
