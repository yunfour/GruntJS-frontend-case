define("common/setFilter/0.0.1/setFilter", [ "$" ], function(require) {
    var $ = require("$");
    function setFilter(filterData, filterPanel, pagerPanel) {
        var fields = filterPanel.find("input,textarea,select"), filterBtn = filterPanel.find("a.J-filterBtn"), fieldSet = {}, filterUrl = filterPanel.attr("data-filter-url");
        filterData = filterData || {};
        function getInfo() {
            var info = {}, field, fieldVal, fieldType, fieldTagName;
            for (var k in fieldSet) {
                if (fieldSet.hasOwnProperty(k)) {
                    field = fieldSet[k];
                    fieldType = field.eq(0).prop("type").toLowerCase();
                    fieldTagName = field.eq(0).prop("tagName").toLowerCase();
                    if (fieldTagName === "input") {
                        if (fieldType === "radio" || fieldType === "checkbox") {
                            fieldVal = [];
                            field.filter(":checked").each(function() {
                                fieldVal.push(encodeURIComponent($(this).val()));
                            });
                            fieldVal = fieldVal.join(",");
                        } else if (fieldType === "password" || fieldType === "text") {
                            fieldVal = encodeURIComponent(field.eq(0).val());
                        }
                    }
                    if (fieldTagName === "textarea") {
                        fieldVal = encodeURIComponent(field.eq(0).val());
                    } else if (fieldTagName === "select") {
                        fieldVal = encodeURIComponent(field.eq(0).val());
                    }
                    if ($.trim(fieldVal) !== "") {
                        info[k] = fieldVal;
                    }
                }
            }
            return info;
        }
        function goFilter(info, url) {
            var params = [];
            for (var k in info) {
                if (info.hasOwnProperty(k)) {
                    if (info[k]) {
                        params.push(k + "=" + info[k]);
                    }
                }
            }
            params = params.join("&");
            if (url.indexOf("?") === -1) {
                url = url + "?" + params;
            } else {
                url = url + params;
            }
            location.href = url;
        }
        fields.each(function(i) {
            var field = $(this), fieldName = field.attr("name");
            if (fieldSet[fieldName]) {
                return;
            }
            fieldSet[fieldName] = filterPanel.find("[name=" + fieldName + "]");
        });
        filterBtn.on("click", function() {
            var info = getInfo();
            filterData = $.extend(filterData, info);
            filterData.currentPage = "";
            goFilter(filterData, filterUrl);
        });
        if (pagerPanel) {
            pagerPanel.delegate("li", "click", function() {
                var btn = $(this), page = filterData.currentPage || pagerPanel.find("li.active").data("page") || 1;
                if (btn.hasClass("disabled")) {
                    return;
                }
                if (btn.hasClass("J-prev")) {
                    page = page - 1;
                } else if (btn.hasClass("J-next")) {
                    page = page + 1;
                } else {
                    page = btn.data("page");
                }
                filterData.currentPage = page;
                goFilter(filterData, filterUrl);
            });
        }
    }
    return setFilter;
});
