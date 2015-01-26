/*! gruntTest 2015-01-26 */
define("pages/myAccount/1.0.0/myAccount",["$","components/vScroll/0.0.1/vScroll","components/tab/1.0.1/tab","common/validateForm/0.0.1/validateForm","pages/config/1.0.0/config"],function(a){var b=a("$"),c=(a("components/vScroll/0.0.1/vScroll"),a("components/tab/1.0.1/tab"),a("common/validateForm/0.0.1/validateForm")),d=a("pages/config/1.0.0/config"),e=(b(window),b("#J-theFrm")),f=(e.find("input[name=role]"),b("#username"),b("#email"),b("#confirmPassword"),b("#checkCode"),e.find("input[name=accountType]"),b("#companyName"),b("#telephone"),b("#bankAccount"),b("#bank"),b("#name"),b("#idNum"),b("#mobile"),b("#bankOfPerson"),b("#bankAccountOfPerson"),b("#J-roleCheckboxPanel")),g=(b("#J-companyInfo"),b("#J-personalInfo"),e.find("input[type=submit]"),"http://localhost:8089/push/html/jsp/saveAccount.jsp"),h={role:{required:!0,emptyTip:"请选择角色！",asyncVali:{url:g,successTip:"保存成功！"}},email:{emptyTip:"请输入有效的Email地址！",required:!0,patterns:[{pattern:d.regExp.email,noMatchTip:"您输入的邮箱格式错误！"}],asyncVali:{url:g,successTip:"保存成功！"}},password:{emptyTip:"请输入密码！",required:!0,patterns:[{pattern:function(a){return a.length>=8&&a.length<=16},noMatchTip:"长度应为8-16个字符！"},{pattern:function(a){return!/^[0-9]+$/.test(a)},noMatchTip:"不能全为数字！"},{pattern:function(a){return!/^[a-z]+$/.test(a)&&!/^[A-Z]+$/.test(a)},noMatchTip:"不能全为字母！"}],asyncVali:{url:g,successTip:"保存成功！"}},telephone:{patterns:[{pattern:function(a){var b=a.length;return b>=11&&15>=b},noMatchTip:"长度应为11-15位数字"},{pattern:function(a){return d.regExp.telephone.test(a)||d.regExp.mobile.test(a)},noMatchTip:"请输入真实有效的联系电话"}],asyncVali:{url:g,successTip:"保存成功！"}},bank:{asyncVali:{url:g,successTip:"保存成功！"}}};f.delegate("span.reg-checkbox","click",function(){var a=b(this),c=a.children("input[name=role]"),d="reg-checkbox-checked",e=a.hasClass(d);e?(a.removeClass(d),c.removeAttr("checked")):(a.addClass(d),c.attr("checked","checked"))}),e.delegate("a.J-editBtn","click",function(){var a=b(this),c=a.closest("div.com-form-item"),d=c.find("div.J-editPanel"),e=c.find("div.J-infoPanel");e.hide(),d.show()}),e.delegate("input.J-saveBtn","click",function(){var a=b(this),d=a.closest("div.com-form-item"),e=d.find("div.J-editPanel"),f=d.find("div.J-infoPanel"),g=e.find("input").eq(0),i=b.trim(g.val()),j=g.attr("name");"true"!==a.data("ajaxlock")&&(a.data("ajaxlock","true"),g.attr("readonly","readonly").addClass("com-input-disabled"),c.valiFn(g,h[j],function(b){if(a.data("ajaxlock","false"),g.removeAttr("readonly").removeClass("com-input-disabled"),b){var d="";if(e.hide(),f.show(),"role"===j){var h=e.find("input[name="+j+"]:checked");d=2===h.size()?"我是开发者、推广者":"developer"===h.val()?"我是开发者":"我是推广者"}else"password"!==j&&(d=i);f.find("span").html(d),window.setTimeout(function(){c.showExplain(g,!1)},1e3)}}))}),e.delegate("input.J-cancelBtn","click",function(){var a=b(this),d=a.closest("div.com-form-item"),e=d.find("div.J-editPanel"),f=d.find("div.J-infoPanel"),g=e.find("input").eq(0);e.hide(),f.show(),c.showExplain(g,!1)})});