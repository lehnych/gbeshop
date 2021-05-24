AOS.init();

$(document).ready(function() {

    var headerHeight = $('header').outerHeight();

    $('#mobile-menu-bar').css('top', headerHeight);

    $('#mobile-menu-icon').on('click',function(){
        $('#mobile-menu-bar').toggleClass('active');
        $('body').toggleClass('noscroll');
    });
    $('#mobile-menu-header img').on('click',function(){
        $('#mobile-menu-bar').removeClass('active');
        $('body').removeClass('noscroll');
    });
});
