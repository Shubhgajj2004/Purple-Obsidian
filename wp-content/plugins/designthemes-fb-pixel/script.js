(function() {
    var fbq = (function() {
        function fbq() {
            if (arguments.length > 0) {
                var action, pixel_id, type_track, content_obj;

                if (typeof arguments[0] == "string") action = arguments[0];
                if (typeof arguments[1] == "string") pixel_id = arguments[1];
                if (typeof arguments[2] == "string") type_track = arguments[2];
                if (typeof arguments[3] == "object") content_obj = arguments[3];

                var params = [];
                if (typeof action == "string" && action.replace(/\s+/gi, "") != "" &&
                    typeof pixel_id == "string" && pixel_id.replace(/\s+/gi, "") != "" &&
                    typeof type_track == "string" && type_track.replace(/\s+/gi, "")) {

                    params.push("id=" + encodeURIComponent(pixel_id));
                    switch (type_track) {
                        case "PageView":
                        case "ViewContent":
                        case "Search":
                        case "AddToCart":
                        case "InitiateCheckout":
                        case "AddPaymentInfo":
                        case "Lead":
                        case "CompleteRegistration":
                        case "Purchase":
                        case "AddToWishlist":
                            params.push("ev=" + encodeURIComponent(type_track));
                            break;
                        default:
                            return;
                    }

                    params.push("dl=" + encodeURIComponent(document.location.href));
                    params.push("rl=" + encodeURIComponent(document.referrer));
                    params.push("if=false");
                    params.push("ts=" + new Date().getTime());

                    if (typeof content_obj == "object") {
                        for (var u in content_obj) {
                            if (typeof content_obj[u] == "object" && content_obj[u] instanceof Array) {
                                if (content_obj[u].length > 0) {
                                    for (var y = 0; y < content_obj[u].length; y++) {
                                        content_obj[u][y] = (content_obj[u][y] + "").replace(/^\s+|\s+$/gi, "").replace(/\s+/gi, " ").replace(/,/gi, "§");
                                    }
                                    params.push("cd[" + u + "]=" + encodeURIComponent(content_obj[u].join(",").replace(/^/gi, "[\"").replace(/$/gi, "\"]").replace(/,/gi, "\",\"").replace(/§/gi, "\,")));
                                }
                            } else if (typeof content_obj[u] == "string")
                                params.push("cd[" + u + "]=" + encodeURIComponent(content_obj[u]));
                        }
                    }

                    params.push("v=" + encodeURIComponent("2.5.0"));

                    if (typeof window.jQuery == "function") {
                        var iframe_id = new Date().getTime();
                        jQuery("body").append("<img height='1' width='1' style='display:none;width:1px;height:1px;' id='fb_" + iframe_id + "' src='https://www.facebook.com/tr/?" + params.join("&") + "' />");
                        setTimeout(function() {
                            jQuery("#fb_" + iframe_id).remove();
                        }, 1000);
                    }
                }
            }
        }

        return fbq;
    });

    window.fbq = new fbq();
})();

fbq('track', '361651201648926', 'PageView');
fbq('track', '933175913837538', 'PageView');
fbq('track', '968705806982822', 'PageView');
//fbq('track', '<FIRST_PIXEL_ID>', 'Purchase', {value: 79.9, currency: 'BRL'});
//fbq('track', '<SECOND_PIXEL_ID>', 'Purchase', {value: 89.9, currency: 'BRL'});