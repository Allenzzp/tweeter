/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const renderTweets = function(tweets) { //render tweets already exists
    const $tweets = $("#tweets");
    tweets.forEach(tweetObj => {
      $tweets.append(createTweetElement(tweetObj));
    });
  }

  const createTweetElement = (tweet) => { //use tweet Obj to create tweet element
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

  const createTweetObj = (comment) => {
    return {
      user: {
        name: "Allen",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@Allenzzp"
      },
      content: {
        text: `${comment}`
      },
      "create_at": Date.now()
    }
  };

  const sendTweet = (elementObj) => {
    const data = $(elementObj).serialize();//text=xxxx
    let valid = data.split("=")[1];
    if (valid.length === 0) {
      alert("You haven't entered anything!");
      return;
    } else if (valid.length > 140) {
      alert("You message cannot go over 140 characters!");
      return;
    };
    //$.ajax({url: "/tweets", data: data, method: "POST"}); // I don't need to send post request right??? 
    valid = valid.replaceAll("%20", " "); //is there other way to do this???
    const $tweets = $("#tweets");
    const $newTweetComment = createTweetElement(createTweetObj(valid));
    $tweets.prepend($newTweetComment);
  };

  $(".new-tweet form").on("submit", function(event) { //press button to send tweet
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