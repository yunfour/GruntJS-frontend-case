/*! gruntTest 2014-08-05 */
define("pages/manageApp/1.0.0/manageApp-debug",["$-debug"],function(a){var b=a("$-debug"),c=b("#J-appLst");c.delegate("div.app-spread-info","click",function(){var a=b(this),c=a.find("i.com-ico"),d=a.closest("li.app-lst-itm").find("div.app-rate");c.hasClass("up-ico")?(d.hide(),c.removeClass().addClass("com-ico down-ico")):(d.show(),c.removeClass().addClass("com-ico up-ico"))})}),define("pages/manageApp/1.0.0/manageApp",["$"],function(a){var b=a("$"),c=b("#J-appLst");c.delegate("div.app-spread-info","click",function(){var a=b(this),c=a.find("i.com-ico"),d=a.closest("li.app-lst-itm").find("div.app-rate");c.hasClass("up-ico")?(d.hide(),c.removeClass().addClass("com-ico down-ico")):(d.show(),c.removeClass().addClass("com-ico up-ico"))})});