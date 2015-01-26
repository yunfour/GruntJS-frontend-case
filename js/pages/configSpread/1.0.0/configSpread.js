/*! gruntTest 2015-01-26 */
define("pages/configSpread/1.0.0/configSpread",["$","./uploadScreenshot","gallery/upload/1.1.1/upload","components/tip/0.0.1/tip","components/progress/0.0.1/progress","common/tools/0.0.1/tools","./setDeadline","components/tab/1.0.1/tab","gallery/jquery-ui/1.9.2/jquery-ui-debug","./setFrm","common/validateForm/0.0.1/validateForm"],function(a){a("$");a("./uploadScreenshot"),a("./setDeadline"),a("./setFrm")}),define("pages/configSpread/1.0.0/setDeadline",["$","components/tab/1.0.1/tab","gallery/jquery-ui/1.9.2/jquery-ui-debug"],function(a){var b=a("$"),c=a("components/tab/1.0.1/tab"),d=b("#J-configSpreadFrm"),e=d.find("input[name=deadline]"),f=b("#J-deadlineAttach"),g=b("#deadlineValue"),h=f.find("label.com-ico-canlendar"),i=new c({tabItems:e,selectedClass:""});a("gallery/jquery-ui/1.9.2/jquery-ui-debug")(b),i.on("change",function(){var a=i.getAttr("index");f.show(),g.val(""),h.hide(),0===a?(h.show(),g.datepicker({dateFormat:"yy-mm-dd"})):g.datepicker("destroy")})}),define("pages/configSpread/1.0.0/setFrm",["$","components/tab/1.0.1/tab","common/validateForm/0.0.1/validateForm"],function(a){function b(){var a={},b=[];return f.each(function(a){var d=f.eq(a),e=c.trim(d.val());""!==e&&b.push(encodeURIComponent(e))}),a.appLabel=b.join(";"),a.appIntro=encodeURIComponent(c.trim(g.val())),a.spreadPrice=encodeURIComponent(c.trim(h.val())),a.deadline=i.filter(":checked").val(),a.deadlineVal=j.val(),a.targets=k.filter(":checked").val(),{}}var c=a("$"),d=(a("components/tab/1.0.1/tab"),a("common/validateForm/0.0.1/validateForm")),e=c("#J-configSpreadFrm"),f=e.find("input.J-appLabel"),g=c("#appIntro"),h=c("#spreadPrice"),i=e.find("input[name=deadline]"),j=c("#deadlineValue"),k=e.find("input[name=targets]"),l=e.find("input[type=button]"),m={appLabel_1:{isShowSuccessTip:!1,patterns:[{pattern:function(){for(var a=!1,b=0,d=f.size();d>b;b++)if(""!==c.trim(f.eq(b).val())){a=!0;break}return a},noMatchTip:"请输入应用标签"}]},appIntro:{isShowSuccessTip:!1,patterns:[{pattern:function(a){var b=a.length>=20&&a.length<=500;return b},noMatchTip:"应用简介为20-500个中文字符！"}]},screenshot:{isShowSuccessTip:!1,required:!0,emptyTip:"请上传应用截图"},spreadPrice:{isShowSuccessTip:!1,required:!0,emptyTip:"请输入推广价格",patterns:[{pattern:function(a){var b=Number(a),c=!0;return isNaN(b)?c=!1:0>=b&&(c=!1),c},noMatchTip:"推广价格必须为大于0数值！"}]},deadline:{isShowSuccessTip:!1,required:!0,emptyTip:"请选择推广截止方式"},deadlineValue:{isShowSuccessTip:!1,required:!0,emptyTip:"请选输入内容",patterns:[{pattern:function(a){var b=!0,c=i.filter(":checked"),d=Number(a);return"date"===c.val()||"total"===c.val()&&(0>=d||isNaN(d))&&(b=!1),b},noMatchTip:"格式不正确"}]},targets:{isShowSuccessTip:!1,required:!0,emptyTip:"请选择用户激活指标"}};i.on("click",function(){var a=c(this).val();d.valiFn(i,m.deadline),"date"===a?d.valiFn(j,m.deadlineValue):d.valiFn(j,m.deadlineValue)}),l.on("click",function(){function a(){var a=d.isPassVali(e,m);return a.isPass||(d.goVali(e,m),a=d.isPassVali(e,m)),a.isPass}return l.hasClass("com-btn-disable")?!1:(d.showExplain(l,!1),a()?(l.addClass("com-btn-disable").val("提交中..."),c.post("jsp/submitConfigSpread.jsp",b(),function(a){l.removeClass("com-btn-disable").val("提交"),"1"!==a.status?d.showExplain(l,!0,"warn",a.message):d.showExplain(l,!0,"success","提交成功")},"JSON")):d.showExplain(l,!0,"warn","请按要求完善以上信息"),!1)})}),define("pages/configSpread/1.0.0/uploadScreenshot",["$","gallery/upload/1.1.1/upload","components/tip/0.0.1/tip","components/progress/0.0.1/progress","common/tools/0.0.1/tools"],function(a){function b(a){for(var b,c={isPass:!0},d=0,e=a.length;e>d;d++){if(b=a[d],!l.isImgType(a[d].name))return c.isPass=!1,c.message="请选择格式为JPG,PNG,GIF的文件",c;if(b.size&&b.size>1e5)return c.isPass=!1,c.message="文件大小不能超过500k",c}return c}function c(a,b,c){if(f||(f=new j({theme:"red",arrowPosition:6})),g&&window.clearTimeout(g),a){var d=b.offset();f.setTipText(c).setPosition(d.left+47,d.top-2).show(),g=window.setTimeout(function(){f.hide()},3e3)}else f.hide()}function d(a,b){var c=a.find("div.uploading");0===c.size()&&(c=h('<div class="uploading"></div>').appendTo(a)),c.html("上传中 "+b+"%"),c.show()}function e(a,b){var c=a.find("div.uploading"),d=a.find("div.img-panel");c.hide(),0===d.size()?(d=h('<div class="img-panel"><img src="'+b+'" alt="应用截图"><a href="javascript:;" class="img-del-btn">x</a></div>'),c.before(d)):d.find("img").attr("src",b),a.removeClass("bordered"),d.show()}var f,g,h=a("$"),i=a("gallery/upload/1.1.1/upload"),j=a("components/tip/0.0.1/tip"),k=a("components/progress/0.0.1/progress"),l=a("common/tools/0.0.1/tools"),m=h("#J-screenshotLst"),n=m.children("li"),o=h("#screenshot");n.each(function(a){var f=h(this),g=new k,j=new i({trigger:f,name:"screenshot",action:"./jsp/uploadScreenshot.jsp",accept:"image/*",multiple:!1,data:{index:a,r:Math.random()},change:function(a){var d=b(a);return d.isPass?(j.submit(),l.hide(),g.start(),void 0):(c(!0,f,d.message),!1)},error:function(){j._uploaders[0].refreshInput(),g.stop(),c(!0,f,"上传文件出错，请重试"),f.data("uploaderFrm").show()},success:function(b){var d=h.parseJSON(b),i=o.val().split(";");j._uploaders[0].refreshInput(),g.finish().stop(),"1"===d.status?(e(f,d.data),i[a]=encodeURI(d.data),o.val(i.join(";"))):(c(!0,f,"上传文件出错，请重试"),f.data("uploaderFrm").show())},progress:function(){}}),l=j._uploaders[0].form;g.on("progress",function(){var a=parseInt(g.getProgress(),10);d(f,a)}).on("finish",function(){f.find("div.uploading").hide()}).on("stop",function(){f.find("div.uploading").hide()}),f.data({uploader:j,uploaderFrm:l}),f.find("div.img-panel img").size()&&l.hide()}),m.delegate("a.img-del-btn","click",function(){var a=h(this),b=a.closest("li"),c=b.find("div.img-panel"),d=b.data("uploaderFrm");b.addClass("bordered"),d.show(),c.remove()})});