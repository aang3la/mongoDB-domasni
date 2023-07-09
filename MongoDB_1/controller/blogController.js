//? da ima create i getall funkcionlanost

//* Povikuvanje na blog modelot za komunikacija so databazata
const Blog = require("../model/blogModel");

//* Kreiranje na nov dokument vo kolekcijata
createBlog = async (req, res) => {
    try{
        const newBlog = await Blog.create(req.body);
        res.send(newBlog);
    }
    catch(err) {
        res.status(400).json ({
            status: "fail",
            message: err,
        });
    }
};

//* Prikazuvanje na site blogs (cela kolekcija)
getAllBlogs = async (req, res) => {
    try{
        const blogs = await Blog.find();

        res.status(200).json({
            status: "Success",
            data: {
                blogs: blogs,
            },
        });
    }
    catch(err) {
        res.status(404).json ({
            status: "fail",
            message: err,
        });
    }
};

module.exports = {
    createBlog,
    getAllBlogs
};