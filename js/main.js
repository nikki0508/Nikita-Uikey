(function () {
  "use strict";
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  // Full Height
  var fullHeight = function () {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
  };
  // Animations
  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;
          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated");
                  } else {
                    el.addClass("fadeInUp animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      {
        offset: "85%",
      }
    );
  };
  // Burger Menu
  var burgerMenu = function () {
    $(".js-nikki-nav-toggle").on("click", function (event) {
      event.preventDefault();
      var $this = $(this);
      if ($("body").hasClass("offcanvas")) {
        $this.removeClass("active");
        $("body").removeClass("offcanvas");
      } else {
        $this.addClass("active");
        $("body").addClass("offcanvas");
      }
    });
  };
  // Click outside of offcanvass
  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $(".nikki-aside, .js-nikki-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-nikki-nav-toggle").removeClass("active");
        }
      }
    });
    $(window).scroll(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-nikki-nav-toggle").removeClass("active");
      }
    });
  };
  // Sub Menu
  $(".nikki-main-menu li.nikki-sub>a").on("click", function () {
    $(this).removeAttr("href");
    var element = $(this).parent("li");
    if (element.hasClass("open")) {
      element.removeClass("open");
      element.find("li").removeClass("open");
      element.find("ul").slideUp();
    } else {
      element.addClass("open");
      element.children("ul").slideDown();
      element.siblings("li").children("ul").slideUp();
      element.siblings("li").removeClass("open");
      element.siblings("li").find("li").removeClass("open");
      element.siblings("li").find("ul").slideUp();
    }
  });
  $(".nikki-main-menu>ul>li.nikki-sub>a").append(
    '<span class="holder"></span>'
  );
  // Slider
  var sliderMain = function () {
    $(".nikki-hero .flexslider").flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
      before: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
    });
  };
  // Document on load.
  $(function () {
    fullHeight();
    contentWayPoint();
    burgerMenu();
    mobileMenuOutsideClick();
    sliderMain();
  });
  // Show more
  $(function () {
    $(document).on("click", ".nikki-more-trigger", function (event) {
      event.preventDefault();
      if ($(".nikki-show-more-container").hasClass("visible")) {
        $(".nikki-show-more-container").toggleClass("animated");
        $(".nikki-show-more-container").removeClass("visible");
      } else {
        $(".nikki-show-more-container").addClass("visible");
        $(".nikki-show-more-container").removeClass("animated");
        $(".nikki-more-wrapper").addClass("hidden");
      }
    });
  });
  $(function () {
    var self = this;
    var $grid = $(".grid");

    $grid.each(function () {
      var $el = $(this);
      var initial_items = 9;
      function showNextItems(pagination) {
        var itemsMax = $(".visible_item").length;
        var itemsCount = 0;
        $(".visible_item").each(function () {
          if (itemsCount < pagination) {
            $(this).removeClass("visible_item");
            itemsCount++;
          }
        });
        if (itemsCount >= itemsMax) {
          $(".shop-nikki-more-trigger").hide();
        }
      }
      $(".shop-nikki-more-trigger").on("click", function (e) {
        e.preventDefault();
        var next_items = 9;
        showNextItems(next_items);
      });
    });
  });
})();
