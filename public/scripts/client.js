/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const showError = function (errDisplay, txt) {
  errDisplay.slideDown().text(txt);
  errDisplay.css("display", "block");
};
const hideError = function (errDisplay) {
  errDisplay.slideUp();
  errDisplay.css("display", "none");
};

const listenForTextChange = function (errDisplay) {
  $(".form-textarea").change(function () {
    hideError(errDisplay);
  });
};

const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    ${escapeText(tweetData.content.text)}
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


const validateTweet = function (tweetText) {
  if (tweetText.length === 0) {
    return "Can't submit an empty tweet";
  } else if (tweetText.length > 140) {
    return "Tweet length must be less than 140 characters";
  }
  return null;
};


$(document).ready(function () {
  const errDisplay = $(".new-tweet-error");

  $('.btn-compose-tweet').click(function () {
    var $section = $('section.new-tweet');

    if ($section.is(':visible')) {
      $section.slideUp('fast');
    } else {
      $section.slideDown('fast');
      $section.find('textarea').focus();
    }
  });


  $("#form-tweet").submit(function (event) {
    // console.log($(this).serialize());
    event.preventDefault();

    const tweetText = $("#tweet-text").val();
    const error = validateTweet(tweetText);
    if (error) {
      return showError(errDisplay, error);
    }

    $.post("/tweets", $(this).serialize(), function () {
      loadTweets();
      errDisplay.slideUp();
      // document.getElementById('tweet-text').value = '';
      $("#tweet-text").val("");
      $(".form-counter").text(140);
    });
  });

  function loadTweets() {
    // not expecting use of promises or for them to understand them at least.
    $.ajax('/tweets', { method: 'GET', dataType: "json" })
      .then(function (result) {
        renderTweets(result);
      });
  }

  loadTweets();

});

