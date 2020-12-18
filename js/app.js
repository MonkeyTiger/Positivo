var draggable = false;
$(document).ready(function () {
  $('.section-6 .arrow').mousedown(function () {
    draggable = true;
  });

  $('body').mouseup(function () {
    draggable = false;
    $('body').css('cursor', 'default');
  });

  $('body').mouseleave(function () {
    $('body').css('cursor', 'default');
    draggable = false;
  });

  $('body').mousemove(function (e) {
    if (draggable) {
      $('body').css('cursor', 'pointer');
      $('.section-6 .area').css('width', e.clientX);
      $('.section-6 .arrow').css('left', e.clientX)
      $('.section-6 .border').css('left', e.clientX)
    }
  })

  $('.colorpicker').on('input', function () {
    var color = $(".colorpicker").val();
    $(".light-shadow.bottom").css('boxShadow', '0 0 110px 70px hsl(' + color + ', 100%, 50%)');
    $(".light-shadow.bulb-shadow-back").css('boxShadow', '0 0 110px 70px hsl(' + color + ', 100%, 50%)');
    $(".light-shadow.bulb-shadow-front").css('boxShadow', '30px 1px 50px 45px hsl(' + color + ', 100%, 50%)');
  });

  $(".section-2 .slider.slider1").skewSlider({
    skew: 0,
    slidePercent: 50,
    slideshow: false,
    navDots: false,
    clickOnSiblings: false,
    moveOnHover: 0,
    breakpoints: {
      tablet: {
        maxWidth: 1024,
        ratio: 40 / 13,
        moveOnHover: 3,
        moveFx: false,
        showCaption: false,
      },
      phone1: {
        maxWidth: 900,
        ratio: 40 / 20,
        slidePercent: 100,
        showCaption: false
      }
    }
  });

  $(".section-2 .slider.slider2").skewSlider({
    skew: 0,
    slidePercent: 100,
    slideshow: false,
    navDots: false,
    clickOnSiblings: false,
    moveOnHover: 0,
  });

  $('.section-2 .right').click(function () {
    $('.section-2 .slider').skewSlider('navigate', 'next');
  });

  $('.section-2 .left').click(function () {
    $('.section-2 .slider').skewSlider('navigate', 'previous');
  });

  $(".section-3 .slider").skewSlider({
    skew: -10,
    slidePercent: 70,
    slideshow: false,
    navDots: false,
    clickOnSiblings: false,
  });

  $('.section-3 .right').click(function () {
    $('.section-3 .slider').skewSlider('navigate', 'next');
  });

  $('.section-3 .left').click(function () {
    $('.section-3 .slider').skewSlider('navigate', 'previous');
  });

  $(".section-4 .slider").skewSlider({
    skew: 0,
    slidePercent: 25,
    slideshow: false,
    navDots: false,
    moveOnHover: 0,
    breakpoints: {
      tablet: {
        maxWidth: 1024,
        ratio: 40 / 13,
        moveOnHover: 3,
        moveFx: false,
        showCaption: false,
      },
      phone1: {
        maxWidth: 900,
        ratio: 40 / 20,
        slidePercent: 50,
        showCaption: false
      },
      phone: {
        maxWidth: 600,
        ratio: 40 / 20,
        slidePercent: 90,
        showCaption: false
      }
    }
  });
})