//? shemata da e naslov, opis, ocenka, vreme, aftor
const mongoose = require("mongoose");

//* Kreirame blueprint za nasata databaza
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "You must enter a title of the blog."],
    },
    description: {
        type: String,
    },
    author: {
        type: String,
        required: [true, "You must enter the author of the blog."]
    },
    rating: {
        type: Number,
        default: 3,
    },
    duration: {
        type: Date,
        default: Date.now,
    }
});

//* Baza na shemata sto ja definirame
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;