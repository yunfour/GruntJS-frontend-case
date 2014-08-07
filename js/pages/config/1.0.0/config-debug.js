define("pages/config/1.0.0/config-debug", [], function(require) {
    var CONFIG_DATA = {};
    // 常用正则表达式
    CONFIG_DATA.regExp = {
        // 身份证号码的正则表达式
        idCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/,
        // Email正则表达式
        email: /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z.]{2,6})$/,
        // 邮编正则表达式
        zipcode: /^[0-9][0-9]{0,5}$/,
        // 手机号码
        mobile: /^(1[3,4,5,7,8][0-9]{9})$/,
        // 国内电话号码
        telephone: /^\d{3,4}-\d{7,8}$/
    };
    return CONFIG_DATA;
});
