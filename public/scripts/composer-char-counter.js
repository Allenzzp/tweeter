$(document).ready(() => {

  $("#tweet-text").on("input", function() {
    const len = this.value.length;
    const count = 140 -len;
    const counter = $(".counter");
    if (count < 0) {
      counter.addClass("red-color");
    } else {
      counter.removeClass("red-color");
    }
    counter.val(count);
  });
});
