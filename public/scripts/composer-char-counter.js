$(document).ready(function () {
  // console.log('composer-char-counter connected...');

  /**
   * NOTE: unlike inputs in jquery, a textarea doesn't have a .change event
   * so, we use the .bind to simulate the change event on a textarea
   */
  $('#tweet-text').bind('input propertychange', function () {
    const charsLeft = 140 - this.value.length;
    const formCounter = $(this).parent().find(".form-counter"); // or:  $("output[name='counter']")
    formCounter.val(charsLeft);

    if (charsLeft < 0) {
      formCounter.addClass("error-color");
    } else {
      formCounter.removeClass("error-color");
    }
  });
});