jQuery(document).ready(function(b) {
    function n() {
        k.off("change");
        k = b('.wishlist_table tbody input[type="checkbox"]');
        "undefined" != typeof b.fn.selectBox && b("select.selectBox").selectBox();
        p();
        l()
    }

    function u() {
        var a = b(".woocommerce-message");
        0 == a.length ? b("#yith-wcwl-form").prepend(yith_wcwl_l10n.labels.added_to_cart_message) : a.fadeOut(300, function() {
            b(this).replaceWith(yith_wcwl_l10n.labels.added_to_cart_message).fadeIn()
        })
    }

    function v(a) {
        var c = a.data("product-id"),
            d = b(".add-to-wishlist-" + c);
        c = {
            add_to_wishlist: c,
            product_type: a.data("product-type"),
            action: yith_wcwl_l10n.actions.add_to_wishlist_action
        };
        if (yith_wcwl_l10n.multi_wishlist && yith_wcwl_l10n.is_user_logged_in) {
            var e = a.parents(".yith-wcwl-popup-footer").prev(".yith-wcwl-popup-content"),
                f = e.find(".wishlist-select"),
                g = e.find(".wishlist-name");
            e = e.find(".wishlist-visibility");
            c.wishlist_id = f.val();
            c.wishlist_name = g.val();
            c.wishlist_visibility = e.val()
        }
        r() ? b.ajax({
            type: "POST",
            url: yith_wcwl_l10n.ajax_url,
            data: c,
            dataType: "json",
            beforeSend: function() {
                a.siblings(".ajax-loading").css("visibility",
                    "visible")
            },
            complete: function() {
                a.siblings(".ajax-loading").css("visibility", "hidden")
            },
            success: function(c) {
                var e = b("#yith-wcwl-popup-message"),
                    f = c.result,
                    g = c.message;
                if (yith_wcwl_l10n.multi_wishlist && yith_wcwl_l10n.is_user_logged_in) {
                    var h = b("select.wishlist-select");
                    "undefined" != typeof b.prettyPhoto && "undefined" != typeof b.prettyPhoto.close && b.prettyPhoto.close();
                    h.each(function(a) {
                        a = b(this);
                        var d = a.find("option");
                        d = d.slice(1, d.length - 1);
                        d.remove();
                        if ("undefined" != typeof c.user_wishlists)
                            for (d in d =
                                0, c.user_wishlists) "1" != c.user_wishlists[d].is_default && b("<option>").val(c.user_wishlists[d].ID).html(c.user_wishlists[d].wishlist_name).insertBefore(a.find("option:last-child"))
                    })
                }
                b("#yith-wcwl-message").html(g);
                e.css("margin-left", "-" + b(e).width() + "px").fadeIn();
                window.setTimeout(function() {
                    e.fadeOut()
                }, 2E3);
                "true" == f ? ((!yith_wcwl_l10n.multi_wishlist || !yith_wcwl_l10n.is_user_logged_in || yith_wcwl_l10n.multi_wishlist && yith_wcwl_l10n.is_user_logged_in && yith_wcwl_l10n.hide_add_button) && d.find(".yith-wcwl-add-button").hide().removeClass("show").addClass("hide"),
                    d.find(".yith-wcwl-wishlistexistsbrowse").hide().removeClass("show").addClass("hide").find("a").attr("href", c.wishlist_url), d.find(".yith-wcwl-wishlistaddedbrowse").show().removeClass("hide").addClass("show").find("a").attr("href", c.wishlist_url)) : "exists" == f ? ((!yith_wcwl_l10n.multi_wishlist || !yith_wcwl_l10n.is_user_logged_in || yith_wcwl_l10n.multi_wishlist && yith_wcwl_l10n.is_user_logged_in && yith_wcwl_l10n.hide_add_button) && d.find(".yith-wcwl-add-button").hide().removeClass("show").addClass("hide"),
                    d.find(".yith-wcwl-wishlistexistsbrowse").show().removeClass("hide").addClass("show").find("a").attr("href", c.wishlist_url), d.find(".yith-wcwl-wishlistaddedbrowse").hide().removeClass("show").addClass("hide").find("a").attr("href", c.wishlist_url)) : (d.find(".yith-wcwl-add-button").show().removeClass("hide").addClass("show"), d.find(".yith-wcwl-wishlistexistsbrowse").hide().removeClass("show").addClass("hide"), d.find(".yith-wcwl-wishlistaddedbrowse").hide().removeClass("show").addClass("hide"));
                b("body").trigger("added_to_wishlist", [a, d])
            }
        }) : alert(yith_wcwl_l10n.labels.cookie_disabled)
    }

    function x(a) {
        var c = a.parents(".cart.wishlist_table"),
            d = c.data("pagination"),
            e = c.data("per-page"),
            f = c.data("page"),
            g = a.parents("[data-row-id]");
        c.find(".pagination-row");
        var h = g.data("row-id"),
            m = c.data("id"),
            w = c.data("token");
        d = {
            action: yith_wcwl_l10n.actions.remove_from_wishlist_action,
            remove_from_wishlist: h,
            pagination: d,
            per_page: e,
            current_page: f,
            wishlist_id: m,
            wishlist_token: w
        };
        b("#yith-wcwl-message").html("&nbsp;");
        "undefined" != typeof b.fn.block &&
            c.fadeTo("400", "0.6").block({
                message: null,
                overlayCSS: {
                    background: "transparent url(" + yith_wcwl_l10n.ajax_loader_url + ") no-repeat center",
                    backgroundSize: "16px 16px",
                    opacity: .6
                }
            });
        b("#yith-wcwl-form").load(yith_wcwl_l10n.ajax_url + " #yith-wcwl-form", d, function() {
            "undefined" != typeof b.fn.unblock && c.stop(!0).css("opacity", "1").unblock();
            n();
            b("body").trigger("removed_from_wishlist", [a, g])
        })
    }

    function y(a, c) {
        var d = a.data("product-id"),
            e = b(document).find(".cart.wishlist_table"),
            f = e.data("pagination"),
            g = e.data("per-page"),
            h = e.data("id"),
            m = e.data("token");
        d = {
            action: yith_wcwl_l10n.actions.reload_wishlist_and_adding_elem_action,
            pagination: f,
            per_page: g,
            wishlist_id: h,
            wishlist_token: m,
            add_to_wishlist: d,
            product_type: a.data("product-type")
        };
        r() ? b.ajax({
            type: "POST",
            url: yith_wcwl_l10n.ajax_url,
            data: d,
            dataType: "html",
            beforeSend: function() {
                "undefined" != typeof b.fn.block && e.fadeTo("400", "0.6").block({
                    message: null,
                    overlayCSS: {
                        background: "transparent url(" + yith_wcwl_l10n.ajax_loader_url + ") no-repeat center",
                        backgroundSize: "16px 16px",
                        opacity: .6
                    }
                })
            },
            success: function(a) {
                a = b(a).find("#yith-wcwl-form");
                c.replaceWith(a);
                n()
            }
        }) : alert(yith_wcwl_l10n.labels.cookie_disabled)
    }

    function z(a) {
        var c = a.parents(".cart.wishlist_table"),
            d = c.data("token"),
            e = c.data("id"),
            f = a.parents("[data-row-id]"),
            g = f.data("row-id"),
            h = a.val(),
            m = c.data("pagination"),
            k = c.data("per-page"),
            l = c.data("page");
        d = {
            action: yith_wcwl_l10n.actions.move_to_another_wishlist_action,
            wishlist_token: d,
            wishlist_id: e,
            destination_wishlist_token: h,
            item_id: g,
            pagination: m,
            per_page: k,
            current_page: l
        };
        "" != h && ("undefined" != typeof b.fn.block && c.fadeTo("400", "0.6").block({
            message: null,
            overlayCSS: {
                background: "transparent url(" + yith_wcwl_l10n.ajax_loader_url + ") no-repeat center",
                backgroundSize: "16px 16px",
                opacity: .6
            }
        }), b("#yith-wcwl-form").load(yith_wcwl_l10n.ajax_url + " #yith-wcwl-form", d, function() {
            "undefined" != typeof b.fn.unblock && c.stop(!0).css("opacity", "1").unblock();
            n();
            b("body").trigger("moved_to_another_wishlist", [a, f])
        }))
    }

    function t(a) {
        var c = b(this);
        a.preventDefault();
        c.parents(".wishlist-title").next().show();
        c.parents(".wishlist-title").hide()
    }

    function A(a) {
        var c = b(this);
        a.preventDefault();
        c.parents(".hidden-title-form").hide();
        c.parents(".hidden-title-form").prev().show()
    }

    function r() {
        if (navigator.cookieEnabled) return !0;
        document.cookie = "cookietest=1";
        var a = -1 != document.cookie.indexOf("cookietest=");
        document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
        return a
    }

    function B() {
        if (0 != b(".yith-wcwl-add-to-wishlist").length && 0 == b("#yith-wcwl-popup-message").length) {
            var a = b("<div>").attr("id",
                "yith-wcwl-message");
            a = b("<div>").attr("id", "yith-wcwl-popup-message").html(a).hide();
            b("body").prepend(a)
        }
    }

    function p() {
        k.on("change", function() {
            var a = "",
                c = b(this).parents(".cart.wishlist_table"),
                d = c.data("id");
            c = c.data("token");
            var e = document.URL;
            k.filter(":checked").each(function() {
                var d = b(this);
                a += 0 != a.length ? "," : "";
                a += d.parents("[data-row-id]").data("row-id")
            });
            e = q(e, "wishlist_products_to_add_to_cart", a);
            e = q(e, "wishlist_token", c);
            e = q(e, "wishlist_id", d);
            b("#custom_add_to_cart").attr("href", e)
        })
    }

    function l() {
        "undefined" != typeof b.prettyPhoto && b('a[data-rel^="prettyPhoto[add_to_wishlist_"]').add('a[data-rel="prettyPhoto[ask_an_estimate]"]').unbind("click").prettyPhoto({
            hook: "data-rel",
            social_tools: !1,
            theme: "pp_woocommerce",
            horizontal_padding: 20,
            opacity: .8,
            deeplinking: !1
        })
    }

    function q(a, b, d) {
        d = b + "=" + d;
        a = a.replace(new RegExp("(&|\\?)" + b + "=[^&]*"), "$1" + d); - 1 < a.indexOf(b + "=") || (a = -1 < a.indexOf("?") ? a + ("&" + d) : a + ("?" + d));
        return a
    }
    var C = "undefined" !== typeof wc_add_to_cart_params && null !== wc_add_to_cart_params ?
        wc_add_to_cart_params.cart_redirect_after_add : "",
        k = b('.wishlist_table tbody input[type="checkbox"]:not(:disabled)');
    b(document).on("yith_wcwl_init", function() {
        var a = b(this),
            c = b('.wishlist_table tbody input[type="checkbox"]:not(:disabled)');
        a.on("click", ".add_to_wishlist", function(a) {
            var d = b(this);
            a.preventDefault();
            v(d);
            return !1
        });
        a.on("click", ".remove_from_wishlist", function(a) {
            var d = b(this);
            a.preventDefault();
            x(d);
            return !1
        });
        a.on("adding_to_cart", "body", function(a, b, c) {
            "undefined" != typeof b && "undefined" !=
                typeof c && 0 != b.closest(".wishlist_table").length && (c.remove_from_wishlist_after_add_to_cart = b.closest("[data-row-id]").data("row-id"), c.wishlist_id = b.closest(".wishlist_table").data("id"), wc_add_to_cart_params.cart_redirect_after_add = yith_wcwl_l10n.redirect_to_cart)
        });
        a.on("added_to_cart", "body", function(a) {
            wc_add_to_cart_params.cart_redirect_after_add = C;
            a = b(".wishlist_table");
            a.find(".added").removeClass("added");
            a.find(".added_to_cart").remove()
        });
        a.on("added_to_cart", "body", u);
        a.on("cart_page_refreshed",
            "body", n);
        a.on("click", ".show-title-form", t);
        a.on("click", ".wishlist-title-with-form h2", t);
        a.on("click", ".hide-title-form", A);
        a.on("change", ".change-wishlist", function(a) {
            a = b(this);
            z(a);
            return !1
        });
        a.on("change", ".yith-wcwl-popup-content .wishlist-select", function(a) {
            a = b(this);
            "new" == a.val() ? a.parents(".yith-wcwl-first-row").next(".yith-wcwl-second-row").css("display", "table-row") : a.parents(".yith-wcwl-first-row").next(".yith-wcwl-second-row").hide()
        });
        a.on("change", "#bulk_add_to_cart", function() {
            b(this).is(":checked") ?
                c.attr("checked", "checked").change() : c.removeAttr("checked").change()
        });
        a.on("click", "#custom_add_to_cart", function(a) {
            var d = b(this),
                f = d.parents(".cart.wishlist_table");
            yith_wcwl_l10n.ajax_add_to_cart_enabled && (a.preventDefault(), "undefined" != typeof b.fn.block && f.fadeTo("400", "0.6").block({
                message: null,
                overlayCSS: {
                    background: "transparent url(" + yith_wcwl_l10n.ajax_loader_url + ") no-repeat center",
                    backgroundSize: "16px 16px",
                    opacity: .6
                }
            }), b("#yith-wcwl-form").load(yith_wcwl_l10n.ajax_url + d.attr("href") +
                " #yith-wcwl-form", {
                    action: yith_wcwl_l10n.actions.bulk_add_to_cart_action
                },
                function() {
                    "undefined" != typeof b.fn.unblock && f.stop(!0).css("opacity", "1").unblock();
                    c.off("change");
                    c = b('.wishlist_table tbody input[type="checkbox"]');
                    "undefined" != typeof b.fn.selectBox && b("select.selectBox").selectBox();
                    p();
                    l()
                }))
        });
        a.on("click", ".yith-wfbt-add-wishlist", function(a) {
            a.preventDefault();
            a = b(this);
            var c = b("#yith-wcwl-form");
            b("html, body").animate({
                scrollTop: c.offset().top
            }, 500);
            y(a, c)
        });
        B();
        p();
        l()
    }).trigger("yith_wcwl_init");
    b(document).on("yith_infs_added_elem", function() {
        l()
    });
    "undefined" != typeof b.fn.selectBox && b("select.selectBox").selectBox()
});