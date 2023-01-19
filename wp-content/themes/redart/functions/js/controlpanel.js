if (typeof dttheme_urls === 'undefined') {
    var dttheme_urls = "";
}
$patterns = "";
var $rtl = dttheme_urls.isRTL;

for (var i = 1; i <= 20; i++) {
    $img = dttheme_urls.theme_base_url + "/images/style-picker/pattern" + i + ".jpg";
    $patterns += '<li>';
    $patterns += '<a id="pattern' + i + '"  href="" title="">';
    $patterns += '<img src="' + $img + '" alt="pattern' + i + '" title="pattern' + i + '" width="30" height="30" />';
    $patterns += '</a>';
    $patterns += '</li>';
}

$color = ["red", "blue", "brown", "cadetblue", "chillipepper", "cyan", "darkgolden", "deeporange", "deeppurple", "green", "lime", "magenta", "orange", "pink", "purple", "skyblue", "teal", "turquoise", "wisteria", "yellow"];
$colors = "";
for (var i = 0; i < $color.length; i++) {
    $img = dttheme_urls.theme_base_url + "/images/style-picker/" + $color[i] + ".jpg";
    $colors += '<li>';
    $colors += '<a id="' + $color[i] + '" href="" title="">';
    $colors += '<img src="' + $img + '" alt="color-' + $color[i] + '" title="color-' + $color[i] + '" width="30" height="30" />';
    $colors += '</a>';
    $colors += '</li>';
}

$str = '<!-- **DT Style Picker Wrapper** -->';
$str += '<div class="dt-style-picker-wrapper">';
$str += '	<a href="" title="" class="style-picker-ico"> <i class="fa fa-paint-brush"></i> </a>';
$str += '	<div id="dt-style-picker">';
$str += '   	<h2> Select Your Style </h2>';
$str += '       <h3> Choose your Scheme </h3>';
$str += '		<ul class="scheme-picker">';
$str += '       	<li> <a id="dark" href="" title="" class="selected"> <img src="' + dttheme_urls.theme_base_url + '/images/style-picker/dark.png" alt="Dark" width="39" height="10" /> </a> </li>';
$str += '       	<li> <a id="light" href="" title=""> <img src="' + dttheme_urls.theme_base_url + '/images/style-picker/light.png" alt="Light" width="41" height="11" /> </a> </li>';
$str += '		</ul>';
$str += '		<div class="hr"> </div>';
$str += '		<div id="pattern-holder" style="display:none;">';
$str += '			<h3> Patterns for Boxed Layout </h3>';
$str += '			<ul class="pattern-picker">';
$str += $patterns;
$str += '			</ul>';
$str += '			<div class="hr"> </div>';
$str += '		</div>';
$str += '		<h3> Color scheme </h3>';
$str += '		<ul class="color-picker">';
$str += $colors;
$str += '		</ul>';
$str += '	</div>';
$str += '</div><!-- **DT Style Picker Wrapper - End** -->';

jQuery(document).ready(function($) {
    $("body > div.wrapper").before($str);
    $picker_container = $("div.dt-style-picker-wrapper");

    //Applying Cookies
    if ($rtl == true) {
        if ($.cookie('control-open') === '1') {
            $picker_container.animate({
                right: 0
            });
            $('a.style-picker-ico').removeClass('control-open');
        } else {
            $picker_container.animate({
                right: -230
            });
            $('a.style-picker-ico').addClass('control-open');
        }
    } else {
        if ($.cookie('control-open') === '1') {
            $picker_container.animate({
                left: 0
            });
            $('a.style-picker-ico').removeClass('control-open');
        } else {
            $picker_container.animate({
                left: -230
            });
            $('a.style-picker-ico').addClass('control-open');
        }
    }

    //Check Cookies in diffent pages and do the following things
    if ($.cookie("redarttheme_skin") != null) {
        var $href = dttheme_urls.theme_base_url + '/css/skins/' + $.cookie("redarttheme_skin") + "/style.css";
        $("link[id='skin-css']").attr("href", $href);
        $("ul.color-picker a[id='" + $.cookie("redarttheme_skin") + "']").addClass("selected");
    } else {
        $("ul.color-picker a:first").addClass("selected");
    }

    //Apply Layout
    if ($.cookie("redarttheme_layout") == "boxed") {
        $("ul.layout-picker li a").removeAttr("class");
        $("ul.layout-picker li a[id='" + $.cookie("redarttheme_layout") + "']").addClass("selected");
        $("div#pattern-holder").removeAttr("style");

        $i = ($.cookie("redarttheme_pattern")) ? $.cookie("redarttheme_pattern") : 'pattern1';
        $img = dttheme_urls.theme_base_url + "/framework/theme-options/images/patterns/" + $i + ".jpg";
        $('body').css('background-image', 'url(' + $img + ')').addClass('boxed');;
        $("ul.pattern-picker a[id=" + $.cookie("redarttheme_pattern") + "]").addClass('selected');
    }

    if ($.cookie("redarttheme_scheme") != null) {
        $("ul.scheme-picker li a").removeAttr("class");
        if ($.cookie("redarttheme_scheme") === "dark") {
            $('#light-dark-css').attr('href', dttheme_urls.theme_base_url + "/css/dark-skin.css");
            $("ul.scheme-picker a:first").addClass('selected');
        } else if ($.cookie("redarttheme_scheme") === "light") {
            $('#light-dark-css').attr('href', dttheme_urls.theme_base_url + "/css/light-skin.css");
            $("ul.scheme-picker a:last").addClass('selected');
        }
    }
    //Applying Cookies End

    //Picker On/Off
    $("a.style-picker-ico").click(function(e) {
        $this = $(this);
        if ($rtl == true) {
            if ($this.hasClass('control-open')) {
                $picker_container.animate({
                    right: 0
                }, function() {
                    $this.removeClass('control-open');
                });
                $.cookie('control-open', 1, {
                    path: '/'
                });
            } else {
                $picker_container.animate({
                    right: -229
                }, function() {
                    $this.addClass('control-open');
                });
                $.cookie('control-open', 0, {
                    path: '/'
                });
            }
        } else {
            if ($this.hasClass('control-open')) {
                $picker_container.animate({
                    left: 0
                }, function() {
                    $this.removeClass('control-open');
                });
                $.cookie('control-open', 1, {
                    path: '/'
                });
            } else {
                $picker_container.animate({
                    left: -229
                }, function() {
                    $this.addClass('control-open');
                });
                $.cookie('control-open', 0, {
                    path: '/'
                });
            }
        }
        e.preventDefault();
    }); //Picker On/Off end

    //Layout Picker
    $("ul.layout-picker a").click(function(e) {
        $this = $(this);
        $("ul.layout-picker a").removeAttr("class");
        $this.addClass("selected");
        $.cookie("redarttheme_layout", $this.attr("id"));

        if ($.cookie("redarttheme_layout") === "boxed") {
            $("body").addClass("boxed");
            $("div#pattern-holder").slideDown();

            if ($.cookie("redarttheme_pattern") == null) {
                $("ul.pattern-picker a:first").addClass('selected');
                $.cookie("redarttheme_pattern", "pattern1", {
                    path: '/'
                });
            } else {
                $("ul.pattern-picker a[id=" + $.cookie("redarttheme_pattern") + "]").addClass('selected');
                $img = dttheme_urls.theme_base_url + "/framework/theme-options/images/patterns/" + $.cookie("redarttheme_pattern") + ".jpg";
                $('body').css('background-image', 'url(' + $img + ')');
            }
        } else {
            $("body").removeAttr("style").removeClass("boxed");
            $("div#pattern-holder").slideUp();
            $("ul.pattern-picker a").removeAttr("class");
        }
        window.location.href = location.href;
        e.preventDefault();
    }); //Layout Picker End

    //Scheme Picker
    $("ul.scheme-picker a").click(function(e) {
        $this = $(this);
        $("ul.scheme-picker a").removeAttr("class");
        $this.addClass("selected");
        $.cookie("redarttheme_scheme", $this.attr("id"), {
            path: '/'
        });
        if ($.cookie("redarttheme_scheme") === "dark") {
            $('#light-dark-css').attr('href', dttheme_urls.theme_base_url + "/css/dark-skin.css");
        } else if ($.cookie("redarttheme_scheme") === "light") {
            $('#light-dark-css').attr('href', dttheme_urls.theme_base_url + "/css/light-skin.css");
        }
        e.preventDefault();
    }); //Scheme Picker End

    //Pattern Picker
    $("ul.pattern-picker a").click(function(e) {
        if ($.cookie("redarttheme_layout") == "boxed") {
            $this = $(this);
            $("ul.pattern-picker a").removeAttr("class");
            $this.addClass("selected");
            $.cookie("redarttheme_pattern", $this.attr("id"), {
                path: '/'
            });
            $img = dttheme_urls.theme_base_url + "/framework/theme-options/images/patterns/" + $.cookie("redarttheme_pattern") + ".jpg";
            $('body').css('background-image', 'url(' + $img + ')');
        }
        e.preventDefault();
    }); //Pattern Picker End

    //Color Picker
    $("ul.color-picker a").click(function(e) {
        $this = $(this);
        $("ul.color-picker a").removeAttr("class");
        $this.addClass("selected");
        $.cookie("redarttheme_skin", $this.attr("id"), {
            path: '/'
        });
        var $href = dttheme_urls.theme_base_url + '/css/skins/' + $this.attr("id") + "/style.css";
        $("link[id='skin-css']").attr("href", $href);
        e.preventDefault();
    }); //Color Picker End

});