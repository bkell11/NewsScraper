var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var Article = require("./models/Article");

var PORT = 3000;

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/articledb");

app.get("/scrape", function (req, res) {

    axios.get("").then(function (response) {
        //use cheerio to get html and scrape the html for news articles
        // then save them to the database.
    })
})


app.get("/articles", function (req, res) {
    // get articles saved or all
})

app.get("/articles/:id", function (req, res) {
    // get single article.
})

app.post("/articles/:id", function (req, res) {
    // update if article is saved or not.
})

app.post("/articles/:id/:note", function (req, res) {
    // if note exists delete note.. if it doesn't add note.
})

app.post("/create/articles", function (req, res) {
    var article = new Article({ headline: "testHeadline", summary: "testing headline", url: "blah" });
    article.save(function (err, article) {
        if (err)
            console.log(err);

        console.log(article);
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT);
})