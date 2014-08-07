define("pages/configMsg-add/1.0.0/configMsg-add-debug", [ "$-debug", "common/selectProvince/0.0.1/selectProvince-debug" ], function(require) {
    var $ = require("$-debug");
    var ProvinceTip = require("common/selectProvince/0.0.1/selectProvince-debug");
    var theFrm = $("#J-theFrm"), areaRadios = theFrm.find("input[name=area]"), areaOfProvince = areaRadios.eq(1);
    var provinceTipObj = new ProvinceTip({
        trigger: areaOfProvince
    });
    areaRadios.on("click", function() {
        var radio = $(this);
        if (radio.val() !== "all") {
            provinceTipObj.show();
        } else {
            provinceTipObj.hide();
        }
    });
    provinceTipObj.on("select", function() {
        var provinces = provinceTipObj.getSelected();
        areaOfProvince.val(provinces.join(","));
    });
});
