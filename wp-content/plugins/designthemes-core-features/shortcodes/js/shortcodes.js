jQuery(document).ready(function($) {

    "use strict";

    /* animate number */
    $('.dt-sc-counter').each(function() {

        var $posttext = $(this).find('.dt-sc-counter-number').attr('data-append');
        var $append = '';

        if (typeof $posttext === "undefined") {
            $append = $.animateNumber.numberStepFactories.append('');
        } else {
            $append = $.animateNumber.numberStepFactories.append($posttext);
        }

        $(this).one('inview', function(event, visible) {
            if (visible === true) {
                var val = $(this).find('.dt-sc-counter-number').attr('data-value');
                $(this).find('.dt-sc-counter-number').animateNumber({
                    number: val,
                    numberStep: $append
                }, 2000);
            }
        });
    });

    /* accordion & toggle */
    $('.dt-sc-toggle').toggle(function() {
        $(this).addClass('active');
    }, function() {
        $(this).removeClass('active');
    });
    $('.dt-sc-toggle').click(function() {
        $(this).next('.dt-sc-toggle-content').slideToggle();
    });

    $('.dt-sc-toggle-frame-set').each(function() {
        var $this = $(this),
            $toggle = $this.find('.dt-sc-toggle-accordion');

        $toggle.click(function() {
            if ($(this).next().is(':hidden')) {
                $this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
                $(this).toggleClass('active').next().slideDown();
            }
            return false;
        });

        // activate first item always
        $this.find('.dt-sc-toggle-accordion:first').addClass("active");
        $this.find('.dt-sc-toggle-accordion:first').next().slideDown();
    });

    /* tooltip */
    if ($(".dt-sc-tooltip-bottom").length) {
        $(".dt-sc-tooltip-bottom").each(function() {
            $(this).tipTip({
                maxWidth: "auto"
            });
        });
    }

    if ($(".dt-sc-tooltip-top").length) {
        $(".dt-sc-tooltip-top").each(function() {
            $(this).tipTip({
                maxWidth: "auto",
                defaultPosition: "top"
            });
        });
    }

    if ($(".dt-sc-tooltip-left").length) {
        $(".dt-sc-tooltip-left").each(function() {
            $(this).tipTip({
                maxWidth: "auto",
                defaultPosition: "left"
            });
        });
    }

    if ($(".dt-sc-tooltip-right").length) {
        $(".dt-sc-tooltip-right").each(function() {
            $(this).tipTip({
                maxWidth: "auto",
                defaultPosition: "right"
            });
        });
    }

    /* horizontal tabs */
    if ($('ul.dt-sc-tabs-horizontal').length > 0) {
        $('ul.dt-sc-tabs-horizontal').each(function() {
            $(this).fpTabs('> .dt-sc-tabs-horizontal-content', {
                effect: 'fade'
            });
        });
    }
    if ($('ul.dt-sc-tabs-horizontal-frame').length > 0) {
        $('ul.dt-sc-tabs-horizontal-frame').each(function() {
            $(this).fpTabs('> .dt-sc-tabs-horizontal-frame-content', {
                effect: 'fade'
            });
        });
    }

    /* vertical tabs */
    if ($('ul.dt-sc-tabs-vertical').length > 0) {
        $('ul.dt-sc-tabs-vertical').each(function() {
            $(this).fpTabs('> .dt-sc-tabs-vertical-content', {
                effect: 'fade'
            });
        });

        $('.dt-sc-tabs-vertical').each(function() {
            $(this).find("li:first").addClass('first').addClass('current');
            $(this).find("li:last").addClass('last');
        });

        $('.dt-sc-tabs-vertical li').click(function() {
            $(this).parent().children().removeClass('current');
            $(this).addClass('current');
        });
    }
    if ($('ul.dt-sc-tabs-vertical-frame').length > 0) {
        $('ul.dt-sc-tabs-vertical-frame').each(function() {
            $(this).fpTabs('> .dt-sc-tabs-vertical-frame-content', {
                effect: 'fade'
            });
        });

        $('.dt-sc-tabs-vertical-frame').each(function() {
            $(this).find("li:first").addClass('first').addClass('current');
            $(this).find("li:last").addClass('last');
        });

        $('.dt-sc-tabs-vertical-frame li').click(function() {
            $(this).parent().children().removeClass('current');
            $(this).addClass('current');
        });
    }

    /* ajax mailchimp */
    $('form.dt-sc-subscribe-frm').on('submit', function() {

        var $this = $(this);
        var $mc_fname = $this.find('#dt_mc_fname').val(),
            $mc_email = $this.find('#dt_mc_emailid').val(),
            $mc_apikey = $this.find('#dt_mc_apikey').val(),
            $mc_listid = $this.find('#dt_mc_listid').val();

        $.ajax({
            type: "POST",
            url: dttheme_urls.ajaxurl,
            data: {
                action: 'dt_theme_mailchimp_subscribe',
                mc_fname: $mc_fname,
                mc_email: $mc_email,
                mc_apikey: $mc_apikey,
                mc_listid: $mc_listid
            },
            success: function(response) {
                $this.parent().find('.dt_ajax_subscribe_msg').html(response);
                $this.parent().find('.dt_ajax_subscribe_msg').slideDown('slow');
                if (response.match('success') != null) $this.slideUp('slow');
            }
        });

        return false;

    });

    $(window).load(function() {

        /* testimonial carousel */
        if ($(".carousel_items").length) {
            $(".carousel_items .dt-sc-testimonial-carousel").each(function() {

                var $prev = $(this).parents(".carousel_items").find(".testimonial-prev");
                var $next = $(this).parents(".carousel_items").find(".testimonial-next");

                $(this).carouFredSel({
                    responsive: true,
                    auto: false,
                    width: '100%',
                    prev: $prev,
                    next: $next,
                    height: 'variable',
                    scroll: {
                        easing: "linear",
                        duration: 500
                    },
                    items: {
                        width: 1170,
                        height: 'variable',
                        visible: {
                            min: 1,
                            max: 1
                        }
                    }
                });
            });
        }

        /* partners carousel */
        if ($(".dt-sc-partners-carousel").length) {
            $(".dt-sc-partners-carousel").each(function() {

                var $prev = $(this).parents(".dt-sc-partners-carousel-wrapper").find(".partners-prev");
                var $next = $(this).parents(".dt-sc-partners-carousel-wrapper").find(".partners-next");
                var $scroll = $(this).parents(".dt-sc-partners-carousel-wrapper").attr('data-scroll');
                var $visible = $(this).parents(".dt-sc-partners-carousel-wrapper").attr('data-visible');

                $(this).carouFredSel({
                    responsive: true,
                    auto: false,
                    width: '100%',
                    height: 'variable',
                    prev: $prev,
                    next: $next,
                    scroll: parseInt($scroll), // The number of items to scroll at once
                    items: {
                        visible: {
                            min: parseInt($visible) // The number of items to show at once
                        }
                    }
                });
            });
        }

        /* images carousel */
        if ($(".dt-sc-images-carousel").length) {
            $(".dt-sc-images-carousel").each(function() {

                var $prev = $(this).parents(".dt-sc-images-wrapper").find(".images-prev");
                var $next = $(this).parents(".dt-sc-images-wrapper").find(".images-next");

                $(this).carouFredSel({
                    responsive: true,
                    auto: false,
                    width: '100%',
                    height: 'variable',
                    prev: $prev,
                    next: $next,
                    scroll: 1,
                    items: {
                        width: 570,
                        height: 'variable',
                        visible: {
                            min: 1,
                            max: 1
                        }
                    }
                });
            });
        }

        /* twitter carousel */
        if ($('.dt-sc-twitter-carousel-wrapper').length > 0) {
            $('.dt-sc-twitter-carousel-wrapper .dt-sc-twitter-carousel').carouFredSel({
                width: 'auto',
                height: 'auto',
                scroll: 1,
                direction: 'up',
                items: {
                    height: 'auto',
                    visible: {
                        min: 1,
                        max: 1
                    }
                }
            });
        }

        /* special testimonials */
        if ($('.dt-sc-testimonial-special-wrapper').length > 0) {
            $('.dt-sc-testimonial-special-wrapper .dt-sc-testimonial-special').carouFredSel({
                responsive: true,
                auto: false,
                width: '100%',
                pagination: {
                    container: ".dt-sc-testimonial-images",
                    anchorBuilder: false
                },
                height: 'auto',
                scroll: {
                    fx: "crossfade"
                },
                items: {
                    visible: {
                        min: 1,
                        max: 1
                    }
                }
            });
        }

        /* donutchart */
        $(".dt-sc-donutchart").each(function() {
            var $this = $(this);
            var $bgColor = ($this.data("bgcolor") !== undefined) ? $this.data("bgcolor") : "#5D18D6";
            var $fgColor = ($this.data("fgcolor") !== undefined) ? $this.data("fgcolor") : "#000000";
            var $size = ($this.data("size") !== undefined) ? $this.data("size") : "100";

            $this.donutchart({
                'size': $size,
                'fgColor': $fgColor,
                'bgColor': $bgColor,
                'donutwidth': 5
            });
            $this.donutchart('animate');
        });
    });

    /* parallax section */
    if ($(".dt-sc-parallax-section").length) {
        $('.dt-sc-parallax-section').each(function() {
            $(this).bind('inview', function(event, visible) {
                if (visible === true) {
                    $(this).parallax("50%", 0.5);
                } else {
                    $(this).css('background-position', '');
                }
            });
        });
    }

    /* bmi calculation */
    $('form[name="frmbmi"]').submit(function() {
        var This = $(this);
        var fet = This.find('input[name="txtfeet"]').val();
        var inc = This.find('input[name="txtinches"]').val();
        var tinc = (parseInt(fet) * 12) + parseInt(inc);

        var lbs = This.find('input[name="txtlbs"]').val();

        var bmi = (parseFloat(lbs) / (tinc * tinc)) * 703;

        This.find('input[name="txtbmi"]').val(parseFloat(bmi).toFixed(1));
        return false;
    });

    /* bmi class */
    if ($('.fancyInline').length > 0) {
        var str = $('.fancyInline').attr('href');
        str = str.substr(0, 4);
        if (str !== 'http') {
            $('.fancyInline').fancybox({
                scrolling: 'no',
                width: 'auto',
                height: 'auto'
            });
        }
    }

    /* video manager */
    if ($(".dt-sc-video-wrapper").length) {

        if ($(".dt-sc-video-item").length) {

            $(".dt-sc-video-item").each(function() {
                $(this).click(function() {
                    $('.video-overlay-inner a').attr('href', $(this).attr('data-link'));
                    $('.dt-sc-video-wrapper img').attr('src', $(this).find('.dt-sc-vitem-thumb img').attr('data-full'));
                    $('.video-overlay-inner h2').html($(this).find('h2').html());
                    $('.video-overlay-inner p').html($(this).find('p').html());
                    $(this).parent('div').children().removeClass('active');
                    $(this).addClass('active');
                });
            });
        }

        $(".video-overlay-inner a").prettyPhoto({
            animation_speed: 'normal',
            theme: 'light_square',
            slideshow: 3000,
            autoplay_slideshow: false,
            social_tools: false,
            deeplinking: false
        });
        var video_scroll = $(".dt-sc-video-manager-right").niceScroll({
            cursorcolor: "#ffffff",
            cursorwidth: "2px"
        });
        video_scroll.rail.addClass('dt-sc-skin');
    }
});

/* progress bar */
(function($) {
    $(".dt-sc-progress").one('inview', function(event, visible) {
        var $this = $(this),
            pvalue = $this.find('.dt-sc-bar').attr('data-value');

        if (visible == true) {
            $this.find('.dt-sc-bar').animate({
                width: pvalue + "%"
            }, 600, function() {
                $this.find('.dt-sc-bar-text').fadeIn(400);
            });
        }
    });
})(jQuery);