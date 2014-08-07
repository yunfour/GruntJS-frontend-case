/*! gruntTest 2014-08-05 */
define("pages/login/1.0.0/login-debug",["$-debug","components/vScroll/0.0.1/vScroll-debug","components/tab/1.0.1/tab-debug","./setLogin-debug","pages/config/1.0.0/config-debug","gallery/store/1.3.16/store-debug","base/timeout/0.0.1/timeout-debug","components/tip/0.0.1/tip-debug"],function(a){var b=a("$-debug"),c=a("components/vScroll/0.0.1/vScroll-debug"),d=a("components/tab/1.0.1/tab-debug"),e=b(window),f=b("#J-loginBanner"),g=f.find("div.login-banner-bd"),h=f.find("ul.login-banner-lst"),i=f.find("ul.login-banner-ctrl").children(),j=new c({view:h,speed:800,scale:g.width(),autoScroll:!0,autoScrollTimeout:3e3}),k=function(){var a,b=f.width(),c=g.width();a=(b-c)/2,g.css("left",a)},l=function(a){var b=a.next(),c=b.children(),e=a.children(),f=new d({tabItems:e,selectedClass:"com-rate-done"});f.on("change",function(){var a=f.getAttr("index");c.hide().eq(a).show()})};e.on("resize",function(){k()}),k(),j.autoScroll(),j.on("scroll",function(){var a=j.getIndex();i.removeClass("active").eq(a).addClass("active")}),i.click(function(){var a=i.index(this);j.scrollTo(a)}),l(b("#J-developerRate")),l(b("#J-spreaderRate")),a("./setLogin-debug")}),define("pages/login/1.0.0/login",["$","components/vScroll/0.0.1/vScroll","components/tab/1.0.1/tab","./setLogin","pages/config/1.0.0/config","gallery/store/1.3.16/store","base/timeout/0.0.1/timeout","components/tip/0.0.1/tip"],function(a){var b=a("$"),c=a("components/vScroll/0.0.1/vScroll"),d=a("components/tab/1.0.1/tab"),e=b(window),f=b("#J-loginBanner"),g=f.find("div.login-banner-bd"),h=f.find("ul.login-banner-lst"),i=f.find("ul.login-banner-ctrl").children(),j=new c({view:h,speed:800,scale:g.width(),autoScroll:!0,autoScrollTimeout:3e3}),k=function(){var a,b=f.width(),c=g.width();a=(b-c)/2,g.css("left",a)},l=function(a){var b=a.next(),c=b.children(),e=a.children(),f=new d({tabItems:e,selectedClass:"com-rate-done"});f.on("change",function(){var a=f.getAttr("index");c.hide().eq(a).show()})};e.on("resize",function(){k()}),k(),j.autoScroll(),j.on("scroll",function(){var a=j.getIndex();i.removeClass("active").eq(a).addClass("active")}),i.click(function(){var a=i.index(this);j.scrollTo(a)}),l(b("#J-developerRate")),l(b("#J-spreaderRate")),a("./setLogin")}),define("pages/login/1.0.0/setLogin-debug",["pages/config/1.0.0/config-debug","$-debug","gallery/store/1.3.16/store-debug","base/timeout/0.0.1/timeout-debug","components/tip/0.0.1/tip-debug"],function(a){var b=a("pages/config/1.0.0/config-debug"),c=a("$-debug"),d=(a("gallery/store/1.3.16/store-debug"),a("base/timeout/0.0.1/timeout-debug")),e=a("components/tip/0.0.1/tip-debug"),f=c("#J-loginFrm"),g=f.find("input[name=userEmail]"),h=f.find("input[name=password]"),i=f.find("input[name=checkCode]"),j=c("#J-loginFrmChkCode"),k=c("#J-loginBtn"),l=!1,m=new d(5e3),n=null,o=function(a,b,c){var d=(b.prev(),b.data("errTipObj")),f=b.offset(),g=f.left+b.outerWidth()/2+15,h=f.top-3;d||(d=new e({theme:"red",arrowPosition:6}),b.data("errTipObj",d)),a?("checkCode"===b.attr("name")&&(g-=16),d.setTipText('<div style="width: 120px; text-align: center;">'+c+"</div>").setPosition(g,h).show()):d.hide()},p=function(){return o(!1,g),o(!1,h),o(!1,i),""===c.trim(g.val())?(o(!0,g,"请输入邮箱地址"),!1):b.regExp.email.test(c.trim(g.val()))?""===c.trim(h.val())?(o(!0,h,"请输入用户密码 "),!1):""===c.trim(i.val())?(o(!0,i,"请输入验证码 "),!1):c.trim(i.val()).length<4?(o(!0,i,"验证码为4个字符"),!1):!0:(o(!0,g,"邮箱格式不正确 "),!1)},q=function(a){a=!!a,a?(l=!0,submitBtn.text("正在登录...").addClass("disabled")):(l=!1,submitBtn.text("登 录").removeClass("disabled"))},r=function(){var a={};return a.userName=c.trim(userName.val()),a.password=c.trim(h.val()),a.checkCode=c.trim(i.val()),a.r=Math.random(),a};k.on("click",function(){return l?void 0:(p()&&(q(!0),m.stop(),m.on("timeout",function(){q(!1),console.log("登录超时！")}),m.start(),n=c.post("ajax/login",r(),function(){q(!1),m.stop(),console.log("登录成功！")},"JSON")),!1)}),j.on("click",function(){var a=j.attr("src");j.attr("src",a+"?")})}),define("pages/login/1.0.0/setLogin",["pages/config/1.0.0/config","$","gallery/store/1.3.16/store","base/timeout/0.0.1/timeout","components/tip/0.0.1/tip"],function(a){var b=a("pages/config/1.0.0/config"),c=a("$"),d=(a("gallery/store/1.3.16/store"),a("base/timeout/0.0.1/timeout")),e=a("components/tip/0.0.1/tip"),f=c("#J-loginFrm"),g=f.find("input[name=userEmail]"),h=f.find("input[name=password]"),i=f.find("input[name=checkCode]"),j=c("#J-loginFrmChkCode"),k=c("#J-loginBtn"),l=!1,m=new d(5e3),n=null,o=function(a,b,c){var d=(b.prev(),b.data("errTipObj")),f=b.offset(),g=f.left+b.outerWidth()/2+15,h=f.top-3;d||(d=new e({theme:"red",arrowPosition:6}),b.data("errTipObj",d)),a?("checkCode"===b.attr("name")&&(g-=16),d.setTipText('<div style="width: 120px; text-align: center;">'+c+"</div>").setPosition(g,h).show()):d.hide()},p=function(){return o(!1,g),o(!1,h),o(!1,i),""===c.trim(g.val())?(o(!0,g,"请输入邮箱地址"),!1):b.regExp.email.test(c.trim(g.val()))?""===c.trim(h.val())?(o(!0,h,"请输入用户密码 "),!1):""===c.trim(i.val())?(o(!0,i,"请输入验证码 "),!1):c.trim(i.val()).length<4?(o(!0,i,"验证码为4个字符"),!1):!0:(o(!0,g,"邮箱格式不正确 "),!1)},q=function(a){a=!!a,a?(l=!0,submitBtn.text("正在登录...").addClass("disabled")):(l=!1,submitBtn.text("登 录").removeClass("disabled"))},r=function(){var a={};return a.userName=c.trim(userName.val()),a.password=c.trim(h.val()),a.checkCode=c.trim(i.val()),a.r=Math.random(),a};k.on("click",function(){return l?void 0:(p()&&(q(!0),m.stop(),m.on("timeout",function(){q(!1),console.log("登录超时！")}),m.start(),n=c.post("ajax/login",r(),function(){q(!1),m.stop(),console.log("登录成功！")},"JSON")),!1)}),j.on("click",function(){var a=j.attr("src");j.attr("src",a+"?")})});