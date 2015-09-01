// On page load
$(function() {
  pageLoad();
});

// function definitions

function pageLoad() {
  // load phrases
  getPhrase();
  // set event listeners
  $("#new-catchphrase-form").on("submit", function(e){
    // prevent form submission
    e.preventDefault();
    // post to phrase#create
    $.post("/phrases", $(this).serialize())
      .done(function(res){
        // append new phrase to the page
        getPhrase();
        $("#new-catchphrase-form")[0].reset();
      });
  });
}

function getPhrase() {
  $.get("/phrases", function(res){
    var phrases = res.reverse();
    // grab phrases template
    renderPhrases(phrases)
  });
}

function renderPhrases(phrases) {
  template = _.template($("#catchphrases-template").html());
  // input phrases into template and append to parent
  catchphraseItems = phrases.map(function(phrase) {
   phrase = {_id: phrase._id, word: phrase.word, phrase: phrase.phrase};
    return template(phrase);
  });
  // clear content (for repeated use)
  $("#catchphrase-ul").html("");
  // append phrases to ul
  $("#catchphrase-ul").append(catchphraseItems);
}

function deletePhrase(context) {
  var catchphraseId = $(context).data()._id;
  $.ajax({
    url: '/phrases/' + catchphraseId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all phrases
      getPhrase();
    }
  });
}
