
// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    _ = require("underscore"),
		htmlHome = path.join(process.cwd(), "htmlHome/");
		var db= require("./project");// database
		var logger = require("./logger"); //logger.js
		app.use(logger);


//CONFIG//
//server js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

//body parser config to accpt all datatypes
app.use(bodyParser.urlencoded({ extended: true }));


//ROUTES//

//ROOT ROUTE//
// app.get("/", function(req, res){
// 	res.send("This is the Root Route");
// });
//Home Route//
//you can skip home and have it like this app.get("/", function(req, res){

app.get("/", function (req, res){

//points to location of HTML to be render
//or you can use a variable and plug it instead of pa
	res.sendFile(path.join( htmlHome + "index.html"));
});

app.get("/phrases", function index(req, res){
  db.Phrase.find({}, function(err, phrases_list){
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    res.send(phrases_list);
  })
});

app.post("/phrases", function create(req, res){
  var newPhrase = req.body;
  db.Phrase.create(newPhrase, function(err, phrase){
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    res.send(phrase);
  })
});

app.delete("/phrases/:id", function destroy(req, res){
  var id = req.params.id;
  db.Phrase.remove({_id: id}, function(err, phrase){
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    res.sendStatus(200);
  });

});

// Server Setup at port 3000
app.listen(3000, function(){
	//and sanity check
	console.log("Listening Carajo port 3000");


});