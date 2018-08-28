var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var request = require("request");
var cheerio = require("cheerio");

var Article = require("./models/Article");
// var db = require("./models");
var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/articledb");

app.get("/", function (req, res) {
    // get articles saved or all
    Article.find({ isSaved: false }, function (err, dbArticles) {
        if (err)
            res.json(err);
        else
            res.render("index", { articles: dbArticles });
        // res.json(dbArticles);
    });
});

app.get("/scrape", function (req, res) {

    request("http://www.mlb.com/", function (error, response, html) {
        //use cheerio to get html and scrape the html for news articles
        // then save them to the database.
        var $ = cheerio.load(html);

        var results = [];

        $(".p-headline-stack__headline").each(function (i, element) {

            let article = new Article();

            article.headline = $(this)
                .children("a")
                .text();

            article.summary = article.headline;

            article.url = $(this)
                .children("a")
                .attr("href");

            results.push({
                headline: article.headline,
                summary: article.headline,
                url: article.url
            });
        });
        Article.create(results, function (err, dbArticle) {
            if (err)
                res.json(err);
            else
                res.render("index", { articles: dbArticles });
        });
    });
});


app.get("/articles/getsavedarticles", function (req, res) {
    // get articles saved or all
    Article.find({ isSaved: true }, function (err, dbArticles) {
        if (err)
            res.json(err);
        else
            res.json(dbArticles);
    });
});


app.get("/articles/:id", function (req, res) {
    // get single article.\
    Article.findById(req.params.id, function (err, dbArticle) {
        if (err)
            res.json(err);
        else
            res.json(dbArticle);
    });
});

app.post("/articles/:id", function (req, res) {
    // update if article is saved or not.
    Article.findById(req.params.id, function (err, dbArticle) {
        if (err)
            res.json(err);
        else {
            dbArticle.isSaved = req.body.isSaved;
            dbArticle.save(function (err, dbArticle) {
                if (err)
                    res.json(err);
                else
                    res.status(200);
            });
        }
    })
})

app.post("/articles/:id/:note", function (req, res) {
    // if note exists delete note.. if it doesn't add note.
})



app.listen(PORT, function () {
    console.log("App running on port " + PORT);
})