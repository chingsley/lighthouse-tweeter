/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function (tweets) {
  let tweetsContainer = $('.tweet-container').html('');
  tweets.forEach((tweet) => {
    let tweetElement = createTweetElement(tweet);
    tweetsContainer.prepend(tweetElement);
  });
};


const createTweetElement = function (tweetData) {
  let $tweet = $("<article>").addClass("tweet");
  const html = `
  <header>
    <div class="left profile">
      <img src="${tweetData.user.avatars}" class="usericon">  
      <span class="uname">${tweetData.user.name}</span>
    </div>
    <div class="right uhandle">
      ${tweetData.user.handle}
    </div>
  </header>
  <div class="body">
    ${tweetData.content.text}
  </div>
  <footer>
    <span class="left timeago">
      ${timeago.format(tweetData.created_at)}
    </span>
    <span class="right icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </span>
  </footer>
  `;
  let tweetElement = $tweet.append(html);
  return tweetElement;
};


renderTweets(data);

$(document).ready(function () {
  renderTweets(data);

  $("#form-tweet").submit(function (event) {
    // console.log($(this).serialize());
    event.preventDefault();
    $.post("/tweets", $(this).serialize(), function (response) {
      console.log("response = ", response);
    });
  });
});