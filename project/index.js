var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/week3Project");
module.exports.Phrase = require("./phrases.js");