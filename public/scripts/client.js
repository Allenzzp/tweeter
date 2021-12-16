/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  $("#error").hide();

  const renderTweets = function(tweets) { //render tweets already exists
    const $tweets = $("#tweets");
    $tweets.empty();
    // tweets.sort((a, b) => {
    //   return b.created_at - a.created_at;
    // });
    tweets.forEach(tweetObj => {
      $tweets.append(createTweetElement(tweetObj));
    });
  }

  const createTweetElement = (tweet) => { 
    const $tweet = $(`<article class="tweet"></article>`);
    const $header = $(`
      <header>
        <div class="avatar-name">
          <img src=${tweet.user.avatars}>
          <p>${tweet.user.name}</p>
        </div>
        <p>${tweet.user.handle}</p>
      </header>
    `);
    const $main = $(`
      <main>
        <p class="tweet-body">${tweet.content.text}</p>
      </main>
    `);
    const $footer = $(`
      <footer>
        <time>${timeago.format(tweet.created_at)}</time>
        <section class="icon-group">
          <i class="fa-solid fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </section>
      </footer>
    `);
    $tweet.append($header, $main, $footer);
    return $tweet;
  };

  const sendTweet = (elementObj) => {
    const data = $(elementObj).serialize();//text=hello%20wordld
    const valid = data.split("=");
    if (valid.length === 0) {
      $("#error").slideDown();
      const $errP = $("#error p");
      $errP.text("You haven't entered anything!");
      setTimeout(() => {
        $("#error").slideUp();
      }, 3000);
      return;
    } else if (valid.length > 140) {
      $("#error").slideDown();
      const $errP = $("#error p");
      $errP.text("You message cannot go over 140 characters!");
      setTimeout(() => {
        $("#error").slideUp();
      }, 3000);
      return;
    };
    $.ajax({url: "/tweets", data: data, method: "POST", success: () => {
      loadTweets();
      $("#tweet-text").val("");
    }}); 
  };

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    sendTweet(this);
  });

  // $(".new-tweet form").on("keydown", function(event) { //press enter to send tweet
  //   if (event.which === 13) {
  //     sendTweet(this);
  //   }
  // });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
    .then((res) => {
      renderTweets(res);
    })
    .catch((err) => {
      console.log("error:", err);
    });
  };
  
  loadTweets();
});