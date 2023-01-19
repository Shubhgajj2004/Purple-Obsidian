jQuery.noConflict();
jQuery(document).ready(function($) {

    "use strict";
    if (dttheme_urls.loadingbar === "enable") {
        Pace.on("done", function() {
            $(".loader-wrapper").fadeOut(500);
            $(".pace").remove();
        });
    }

    // Section Height
    if ($('.vertical-align-middle').length) {
        $('.vertical-align-middle').each(function() {
            $(this).css('height', $(this).height());
        });
    }

    if ($('ul.dt-sc-tabs-vertical-frame').length) {
        $('ul.dt-sc-tabs-vertical-frame').each(function() {
            $(this).css('min-height', $(this).height());
        });
    }

    if ($('ul.dt-sc-tabs-vertical').length) {
        $('ul.dt-sc-tabs-vertical').each(function() {
            $(this).css('min-height', $(this).height());
        });
    }

    // <select>	
    $("select").each(function() {
        if ($(this).css('display') != 'none') {
            $(this).wrap('<div class="selection-box"></div>');
        }
    });

    //To Top...
    $().UItoTop({
        easingType: 'easeOutQuart'
    });

    $('.activity-type-tabs > ul >li:first').addClass('selected');
    $('.dir-form > .item-list-tabs > ul > li:first').addClass('selected');

    /*Menu */
    function megaMenu() {
        var screenWidth = $(document).width(),
            containerWidth = $("#header .container").width(),
            containerMinuScreen = (screenWidth - containerWidth) / 2;
        if (containerWidth == screenWidth) {

            $("li.menu-item-megamenu-parent .megamenu-child-container").each(function() {

                var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
                    MegaMenuChildContainerWidth = $(this).width();

                if ((ParentLeftPosition + MegaMenuChildContainerWidth) > screenWidth) {
                    var SwMinuOffset = screenWidth - ParentLeftPosition;
                    var marginFromLeft = MegaMenuChildContainerWidth - SwMinuOffset;
                    var marginFromLeftActual = (marginFromLeft) + 25;
                    var marginLeftFromScreen = "-" + marginFromLeftActual + "px";
                    $(this).css('left', marginLeftFromScreen);
                }

            });
        } else {

            $("li.menu-item-megamenu-parent .megamenu-child-container").each(function() {
                var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
                    MegaMenuChildContainerWidth = $(this).width();

                if ((ParentLeftPosition + MegaMenuChildContainerWidth) > containerWidth) {
                    var marginFromLeft = (ParentLeftPosition + MegaMenuChildContainerWidth) - screenWidth;
                    var marginLeftFromContainer = containerMinuScreen + marginFromLeft - 100; // + 20

                    if (MegaMenuChildContainerWidth > containerWidth) {
                        var MegaMinuContainer = ((MegaMenuChildContainerWidth - containerWidth) / 2) + 10;
                        var marginLeftFromContainerVal = marginLeftFromContainer - MegaMinuContainer;
                        marginLeftFromContainerVal = "-" + marginLeftFromContainerVal + "px";
                        $(this).css('left', marginLeftFromContainerVal);
                    } else {
                        marginLeftFromContainer = "-" + marginLeftFromContainer + "px";
                        $(this).css('left', marginLeftFromContainer);
                    }
                }

            });
        }
    }

    megaMenu();

    $(window).smartresize(function() {
        megaMenu();
    });

    //Menu Hover Animation...

    function menuHover() {

        $("li.menu-item-depth-0,li.menu-item-simple-parent ul li").hover(function() {
            //mouseover 
            if ($(this).find(".megamenu-child-container").length) {
                $(this).find(".megamenu-child-container").stop().fadeIn('fast');
            } else {
                $(this).find("> ul.sub-menu").stop().fadeIn('fast');
            }

        }, function() {
            //mouseout
            if ($(this).find(".megamenu-child-container").length) {
                $(this).find(".megamenu-child-container").stop(true, true).hide();
            } else {
                $(this).find('> ul.sub-menu').stop(true, true).hide();
            }
        });
    } //Menu Hover End

    $("div.dt-video-wrap").fitVids();

    var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i) || navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)) ? true : false;

    var currentWidth = window.innerWidth || document.documentElement.clientWidth;

    if (typeof dttheme_urls !== 'undefined') {

        if (dttheme_urls.nicescroll == "enable") {
            $("html").niceScroll({
                zindex: 999999,
                cursorborder: "1px solid #424242",
                scrollspeed: 80,
                mousescrollstep: 60
            });
        }

        //Sticky Navigation
        if (isMobile && dttheme_urls.mobilestickynav == "enable") {
            $(dttheme_urls.stickyele).sticky({
                topSpacing: 0
            });
        }
        if (dttheme_urls.stickynav === "enable" && currentWidth > 767) {
            $(dttheme_urls.stickyele).sticky({
                topSpacing: 0
            });

        }
    }

    //Mobile Menu
    $("#dt-menu-toggle").click(function(event) {
        event.preventDefault();

        var $menu = $("nav#main-menu").find("ul.menu:first");
        $menu.slideToggle(function() {
            $menu.css('overflow', 'visible');
            $menu.toggleClass('menu-toggle-open');
        });

        var $right = $("nav#main-menu").find("ul.menu-right");
        if ($right.length) {
            $right.slideToggle(function() {
                $right.css('overflow', 'visible');
                $right.toggleClass('menu-toggle-open');
            });
        }
    });

    $(".dt-menu-expand").click(function() {
        if ($(this).hasClass("dt-mean-clicked")) {
            $(this).text("+");
            if ($(this).prev('ul').length) {
                $(this).prev('ul').slideUp(300);
            } else {
                $(this).prev('.megamenu-child-container').find('ul:first').slideUp(300);
            }
        } else {
            $(this).text("-");
            if ($(this).prev('ul').length) {
                $(this).prev('ul').slideDown(300);
            } else {
                $(this).prev('.megamenu-child-container').find('ul:first').slideDown(300);
            }
        }

        $(this).toggleClass("dt-mean-clicked");
        return false;
    });

    //if( !isMobile ){
    currentWidth = window.innerWidth || document.documentElement.clientWidth;
    if (currentWidth > 767) {
        menuHover();
    }
    //}
    //Mobile Menu End	

    $('.dt-search-icon').on('click', function(e) {
        e.stopPropagation();
        $('#header .top-menu-search-container').toggleClass('show-top-menu-search');
    });

    //Blog Template
    if ($(".apply-isotope").length) {
        $(".apply-isotope").isotope({
            itemSelector: '.column',
            transformsEnabled: false,
            masonry: {
                gutter: 20
            }
        });
    }

    //Gallery Post Slider
    if (($("ul.entry-gallery-post-slider").length) && ($("ul.entry-gallery-post-slider li").length > 1)) {
        $("ul.entry-gallery-post-slider").bxSlider({
            auto: false,
            video: true,
            useCSS: false,
            pager: '',
            autoHover: true,
            adaptiveHeight: true
        });
    }

    //Portfolio single
    if ($(".dt-portfolio-single-slider").find("li").length > 1) {
        $(".dt-portfolio-single-slider").bxSlider({
            auto: false,
            video: true,
            useCSS: false,
            pagerCustom: '#bx-pager',
            autoHover: true,
            adaptiveHeight: true,
            controls: false
        });
    }

    var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
    if ($pphoto.length) {
        $pphoto.prettyPhoto({
            hook: 'data-gal',
            show_title: false,
            deeplinking: false,
            social_tools: false,
            default_width: 500,
            default_height: 344
        });
    }

    $('.downcount').each(function() {
        var el = $(this);
        el.downCount({
            date: el.attr('data-date'),
            offset: el.attr('data-offset')
        });
    });

    //Ajax Load Gallery Items...
    var $page = 0;
    var $data = "",
        $content = $('#primary').find('.dt-sc-portfolio-container');

    $('#ajax_load_gallery').click(function() {

        var $noPosts = $(this).attr('data-per-page');
        var $tax = $(this).attr('data-taxonomy');
        var $itemClass = $(this).attr('data-item-class');
        var $allowSpace = $(this).attr('data-allow-space');
        var $style = $(this).attr('data-style');

        $(this).addClass('loading');
        $page++;

        //Perform ajax loads...
        $.ajax({
            type: "post",
            dataType: "html",
            url: dttheme_urls.ajaxurl,
            data: {
                action: "redart_ajax_load_gallery_posts",
                numPosts: $noPosts,
                tax: $tax,
                pageNumber: $page,
                itemClass: $itemClass,
                allowSpace: $allowSpace,
                style: $style
            },
            success: function(data) {
                $data = $(data);
                if ($data.length > 0) {
                    $content.append($data);
                    $('.dt-sc-portfolio-container').isotope('reloadItems').isotope();
                    $(window).trigger('resize');

                    $("a[data-gal^='prettyPhoto[gallery]']").prettyPhoto({
                        show_title: false,
                        social_tools: false,
                        deeplinking: false
                    });
                } else {
                    $('#ajax_load_gallery').html('<span class="fa fa-picture-o"></span>No More Posts Found<i class="load-icon"></i>');
                    $('#ajax_load_gallery').attr('disabled', 'disabled');
                }
                $('#ajax_load_gallery').removeClass('loading');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#ajax_load_gallery').html('<span class="fa fa-picture-o"></span>No More Posts Found<i class="load-icon"></i>');
            }
        });
        return false;
    });

    //Smart Resize Start
    $(window).smartresize(function() {
        //Blog Template
        if ($(".apply-isotope").length) {
            $(".apply-isotope").isotope({
                itemSelector: '.column',
                transformsEnabled: false,
                masonry: {
                    gutter: 20
                }
            });
        }

        //Portfolio Template
        if ($('.dt-sc-portfolio-container').length) {
            var $width = $('.dt-sc-portfolio-container').hasClass("no-space") ? 0 : 20;
            $('.dt-sc-portfolio-container').css({
                overflow: 'hidden'
            }).isotope({
                itemSelector: '.column',
                masonry: {
                    gutter: $width
                }
            });
        }
    });

    // Window Load Start
    $(window).load(function() {

        var portfolioHeight = $('.dt-sc-portfolio-wrapper .portfolio:first').height();
        $('.icon-link-title').css('height', portfolioHeight + 'px');

        //Blog Template
        if ($(".apply-isotope").length) {
            $(".apply-isotope").isotope({
                itemSelector: '.column',
                transformsEnabled: false,
                masonry: {
                    gutter: 20
                }
            });
        }
        //Blog Template End

        //Portfolio Template : Sorting
        var $container = $('.dt-sc-portfolio-container');
        if ($container.length) {
            var $width = $container.hasClass("no-space") ? 0 : 20;

            $container.isotope({
                filter: '*',
                masonry: {
                    gutter: $width
                },
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
        } //Isotope End

        if ($("div.dt-sc-portfolio-sorting").length) {

            $("div.dt-sc-portfolio-sorting a").on('click', function() {
                $("div.dt-sc-portfolio-sorting a").removeClass("active-sort");
                var $width = $container.hasClass("no-space") ? 0 : 20;
                var selector = $(this).attr('data-filter');
                $(this).addClass("active-sort");

                $('.dt-sc-portfolio-container').isotope({
                    filter: selector,
                    masonry: {
                        gutter: $width
                    },
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });

                return false;
            });
        }
        //Portfolio Template : Sorting End

        //FRAME ISOTOPE CATEGORY...
        var $framecontainer = $('.dt-sc-frame-container');
        if ($framecontainer.length) {

            var $width = 12;

            $(window).smartresize(function() {
                $framecontainer.css({
                    overflow: 'hidden'
                }).isotope({
                    itemSelector: '.frame',
                    masonry: {
                        gutter: $width
                    }
                });
            });

            $framecontainer.isotope({
                filter: '*',
                masonry: {
                    gutter: $width
                },
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
        }

        if ($("div.frame-sorting").length) {
            $("div.frame-sorting a").on("click", function() {
                var $width = 12;
                $("div.frame-sorting a").removeClass("active-sort");
                var selector = $(this).attr('data-filter');
                $(this).addClass("active-sort");
                $framecontainer.isotope({
                    filter: selector,
                    masonry: {
                        gutter: $width
                    },
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                var framesel = selector.replace('.', '');
                if (framesel == '*') framesel = 'all';
                $('.dt-frames').stop().slideUp(500);
                $('#frame-' + framesel).stop().slideDown(500);

                return false;
            });
        }
    });

    $(".dt-like-this").click(function() {

        var el = jQuery(this);

        if (el.hasClass('liked')) {
            return false;
        }

        var post = {
            action: 'redart_like_love',
            post_id: el.attr('data-id')
        };

        $.post(dttheme_urls.ajaxurl, post, function(data) {
            el.find('span').html(data);
            el.addClass('liked');
        });
        return false;
    });

    if ($('body').hasClass('page-template-tpl-onepage')) {
        $('nav#main-menu ul.menu').visualNav({
            selectedClass: 'current_page_item',
            externalLinks: 'external',
            useHash: false
        });
        $('#main-menu ul.menu-left').visualNav({
            selectedClass: 'current_page_item',
            externalLinks: 'external',
            useHash: false
        });
        $('#main-menu ul.menu-right').visualNav({
            selectedClass: 'current_page_item',
            externalLinks: 'external',
            useHash: false
        });
        $('.left-header nav#main-menu ul.menu, .left-header-boxed nav#main-menu ul.menu, .left-header-creative nav#main-menu ul.menu').visualNav({
            selectedClass: 'current_page_item',
            externalLinks: 'external',
            useHash: false
        });
    } else {
        if ($('nav#main-menu ul.menu li a[href^="#"]').length) {
            $('nav#main-menu ul.menu li a[href^="#"]').on('click', function(e) {
                $(location).attr('href', dttheme_urls.url + '/' + $(this).attr('href'));
            });
        }
    }

    if ($('body').hasClass('left-header-creative')) {
        $('#header-wrapper').simpleSidebar({
            opener: '#toggle-sidebar',
            wrapper: '#main',
            animation: {
                easing: "easeOutQuint"
            },
            sidebar: {
                align: 'left',
                width: 260
            },
            sbWrapper: {
                display: true
            }
        });

        $('#toggle-sidebar, div[data-simplesidebar="mask"]').click(function() {
            $('#toggle-sidebar').toggleClass('close-icon');
        });
    }
    $('input, textarea').placeholder();

    $('.menu-trigger').on('click', function(e) {
        toggle3dBlock(!$('header').hasClass('nav-is-visible'));
        if ($('.menu-trigger').parents('header').hasClass('nav-is-visible')) $('header').css({
            top: 0
        }).stop().animate({
            top: '60px'
        }, 200);
        else $('header').stop().animate({
            top: 0
        }, 600);
        e.preventDefault();
    });

    function toggle3dBlock(addOrRemove) {
        if (typeof(addOrRemove) === 'undefined') addOrRemove = true;
        $('header').toggleClass('nav-is-visible', addOrRemove);
        $('main').toggleClass('nav-is-visible', addOrRemove);
        $('.rotate-header #main-menu').toggleClass('nav-is-visible', addOrRemove);
    }

});

(function() {

    function toggleOverlay() {
        if (classie.has(overlay, 'open')) {
            classie.remove(overlay, 'open');
            classie.add(overlay, 'close');
            var onEndTransitionFn = function(ev) {
                if (support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(transEndEventName, onEndTransitionFn);
                }
                classie.remove(overlay, 'close');
            };
            if (support.transitions) {
                overlay.addEventListener(transEndEventName, onEndTransitionFn);
            } else {
                onEndTransitionFn();
            }
        } else if (!classie.has(overlay, 'close')) {
            classie.add(overlay, 'open');
        }
    }

    if (jQuery('div.overlay.overlay-hugeinc').length) {

        var triggerBttn = document.getElementById('trigger-overlay'),
            overlay = document.querySelector('div.overlay'),
            closeBttn = overlay.querySelector('div.overlay-close');
        transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            },
            transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
            support = {
                transitions: Modernizr.csstransitions
            };

        triggerBttn.addEventListener('click', toggleOverlay);
        closeBttn.addEventListener('click', toggleOverlay);
    }

})();

jQuery(function($) {
    var mobileHover = function() {
        $('*').on('touchstart', function() {
            $(this).trigger('hover');
        }).on('touchend', function() {
            $(this).trigger('hover');
        });
    };
    mobileHover();
});