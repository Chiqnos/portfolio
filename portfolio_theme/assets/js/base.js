$(function () {
  // SPメニューを開閉するためにクラスを付与
  $('.hamburger_menu_btn').on('click', function () {
    $('.hamburger_menu').toggleClass('active');
    $('body').toggleClass('open');
    $('.header_nav').toggleClass('show');
    if ($('body').hasClass('open')) {
      $('#mask').fadeIn(300);
      $('.hamburger_menu_text').text('Close');
    } else {
      $('#mask').fadeOut(300);
      $('.hamburger_menu_text').text('Menu');
    }
  });

  $('.header_nav a, #mask').click(function () {
    $('.hamburger_menu').removeClass('active');
    $('body').removeClass('open');
    $('.header_nav').removeClass('show');
    $('.hamburger_menu_text').text('Menu');
    $('#mask').fadeOut(300);
  });
});