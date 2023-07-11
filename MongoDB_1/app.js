//? ZA DOMASNA DA SE KREIRA DATABAZA BLOGOVI
//? ime na kolekcija blogs
//? na ruta "/blogs" da se povikuva i da se kreira blog
//? i da inma najmalce 10 bloga

//? prodolzenie na dosegasnata domasna
//? da se kreira celosen crud sistem
//? za blog

//* Go povikuvame express modulot
const express = require("express");

//* Kreirame nova express aplikacija
const app = express();

//* Go povikuvame Mongoose modelot
const mongoose = require("mongoose");

//* Go povikuvame kontrolorot
const blogCotroller = require("./controller/blogController");

//* Persiranje na podatocite koi gi ispranjame od front-end za serverot da gi obraboti
app.use(express.urlencoded({extended: true}));

//* Vospostavuvanje konekcija so MongoDB
mongoose.connect("mongodb+srv://aang3la:asdfghjkl7@cluster0.urorkkp.mongodb.net/blogsDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("Successful connection!");
}).catch((err) => {
    console.log(err);
})

app.get("/blogs", blogCotroller.getAllBlogs);
app.post("/blogs", blogCotroller.createBlog);

app.get("/blogs/:id", blogCotroller.getBlog);
app.patch("/blogs/:id", blogCotroller.updateBlog);
app.delete("/blogs/:id", blogCotroller.deleteBlog);


//* Slusanje na server i startuvanje na app
app.listen(10000, (err) => {
    if(err) console.log(err);
    console.log("Application successfully running.")
})