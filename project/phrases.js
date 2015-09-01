var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PhraseSchema= new Schema({
	word:{
		type: String,
		require: true
	},
	phrase:{
		type: String,
		require:true
	}
});

var Phrase = mongoose.model ("Phrase", PhraseSchema);
module.exports = Phrase;