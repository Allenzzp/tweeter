$(document).ready(()=> {
  const $button = $("#scroll-button");
  $(Window).on("scroll", function() {
    if ($(Window).scrollTop() > 90) {
      $button.addClass("active");
      $(".write-tweet").hide();
      $("nav").addClass("bgc-none");
    } else {
      $button.removeClass("active");
      $(".write-tweet").show();
      $("nav").removeClass("bgc-none");
    }
  });

  $button.on("click", function() {
    if ($(".new-tweet").first().is(":hidden")) {
      $(".new-tweet").slideDown();
    }
    $("#tweet-text").focus();
  });

});