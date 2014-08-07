define(function(require) {
    var template = [
        '<p class="upload-apk-progress-info">',
            '<span>$${fileName}</span>',
            '{@if !message}',
                '<span class="upload-apk-progress-percent">上传中 $${percent}%</span>',
            '{@/if}',
        '</p>',
        '<div class="com-progress {@if message} com-progress-grey {@/if}">',
            '<div class="com-progress-bd" style="width: ${percent}%;"></div>',
        '</div>',
        '<p class="upload-apk-progress-speed">',
            
            '{@if percent == 100}',
                '<span style="color:#4bc577">上传完成</span>',
            '{@else if speed}',
                '<span>$${uploaded}M/$${size}M $${speed}k/s</span>',
            '{@/if}',
            
            '{@if message}',
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e52617;">$${message}</span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="J-retryBtn">重试</a>',
            '{@/if}',
        '</p>'
    ].join('');
    
    return template;
});
