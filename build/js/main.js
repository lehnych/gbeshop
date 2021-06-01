AOS.init();

$(document).ready(function() {

    var w = $(window).width();
    var headerHeight = $('header').outerHeight();

    /* Mobile Nav*/
    $('#mobile-menu-bar').css('top', headerHeight);

    $('#mobile-menu-icon').on('click',function(){
        $('#mobile-menu-bar').toggleClass('active');
        $('body').toggleClass('noscroll');
    });
    $('#mobile-menu-header img').on('click',function(){
        $('#mobile-menu-bar').removeClass('active');
        $('body').removeClass('noscroll');
    });

    /* Filter */
    $('.filter-primary--item---header').each(function () {
        $(this).click(function(){

            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                if (w < 568) {
                    $('span:first-child', this).hide();
                }
            } else {
                $(this).addClass("active");
                if (w < 568) {
                    $('span:first-child', this).show();
                }
            }
            $(".filter-primary--item---content").fadeToggle();
        });
    });
});
