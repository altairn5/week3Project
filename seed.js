// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./project");

var phrases_list =[
  {word: "In what year and what browser did JavaScript first appear ?", phrase: "1995"},
  {word: "Who invented JavaScript ?", phrase: "Brendan Eich"},
  {word: "hat type of language is JavaScript?", phrase: "is a scripting language."}
];

db.Phrase.remove({}, function(err, phrases){

  db.Phrase.create(phrases_list, function(err, phrases){
    if (err) { return console.log(err) };
    console.log("created", phrases.length, "phrases")
    process.exit();
  })

});
