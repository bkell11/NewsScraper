var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },

    summary: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    isSaved: {
        type: Boolean,
        default: false
    },

    notes: [String]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;