(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("dark shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("dark shadow-sm").css("top", "-150px");
    }
  });

  // Facts counter
  // $('[data-toggle="counter-up"]').counterUp({
  //     delay: 10,
  //     time: 2000
  // });
  (function ($) {
    $.fn.counterUpModified = function (options) {
      var settings = $.extend(
        {
          time: 400,
          delay: 10,
        },
        options
      );

      return this.each(function () {
        var $this = $(this);
        var initialValue = parseInt($this.text().replace(/,/g, ""), 10);
        var counterValue = initialValue + 999; // Add 999

        var counterValueStr;
        if (counterValue >= 1000000) {
          counterValueStr = "1M"; // Display as 1M if the value reaches 1 million or more
        } else {
          counterValueStr = counterValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format with commas
        }
        $this.text(counterValueStr); // Update the text with the modified value

        var originalText = counterValue;

        var divisions = settings.time / settings.delay;
        var num = parseInt(originalText, 10);
        var nums = [num];

        for (var i = divisions; i >= 1; i--) {
          var newNum = Math.round((num / divisions) * i);
          nums.unshift(newNum);
        }

        $this.data("counterup-nums", nums);
        $this.text("0");

        var f = function () {
          var currentNum = $this.data("counterup-nums").shift();
          var formattedNum;
          if (currentNum >= 1000000) {
            formattedNum = "1M";
          } else if (currentNum >= 1000000) {
            formattedNum = "10M";
          } else {
            formattedNum = currentNum
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          $this.text(formattedNum);
          if ($this.data("counterup-nums").length) {
            setTimeout($this.data("counterup-func"), settings.delay);
          } else {
            $this.data("counterup-nums", null);
            $this.data("counterup-func", null);
          }
        };
        $this.data("counterup-func", f);

        setTimeout($this.data("counterup-func"), settings.delay);
      });
    };
  })(jQuery);

  // Use the modified counter-up function
  $('[data-toggle="counter-up"]').counterUpModified({
    delay: 10,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    items: 1,
    autoplay: true,
    smartSpeed: 1000,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });
})(jQuery);
