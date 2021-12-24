$(document).ready(()=> {
  const $button = $("#scroll-button");
  //Hide and display GO TO TOP button
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
  //Implement GO TO TOP functionality
  $button.on("click", function() {
    if ($(".new-tweet").first().is(":hidden")) {
      $(".new-tweet").slideDown();
    }
    $("#tweet-text").focus();
  });

});