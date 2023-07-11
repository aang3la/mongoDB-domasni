//? da ima create i getall funkcionlanost

//* Povikuvanje na blog modelot za komunikacija so databazata
const Blog = require("../model/blogModel");

//* Kreiranje na nov dokument vo kolekcijata
const createBlog = async (req, res) => {
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
const getAllBlogs = async (req, res) => {
    try{
        // kreiranje kopija na objektot
        const queryObj = {...req.query};
        // go konveritrame objektot vo string
        let queryString = JSON.stringify(queryObj);
        // upotrebuvanje na metoda replace za modificiranje na podatocite
        queryString = queryString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );
        // posle transformiranjeto go vrakanje nazad vo objekt
        const query = JSON.parse(queryString);

        // gi zemame site dokumenti od kolekcijata so metodata find()
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


//* Prikazuvanje na konkreten dokument preku ID
const getBlog = async (req, res) => {
    try{
        console.log(req.params);
        const blog = await Blog.findById(req.params.id);

        res.status(200).json({
            status: "Success",
            data: {
              blog,
            },
          });
    }
    catch(err){
        res.status(404).json ({
            status: "fail",
            message: err,
        });
    }
};


//* Pravenje promeni na postoechki dokument preku ID
const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "Success",
            data: {
                updatedBlog,
            }
        });
    }
    catch(err) {
        res.status(404).json ({
            status: "fail",
            message: err,
        });
    }
};


//* Brishenje na postoechki dokument preku ID
const deleteBlog = async (req, res) => {
    try{
        await Blog.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null,
          });
    }
    catch(err) {
        res.status(404).json ({
            status: "fail",
            message: err,
        });
    }
}


module.exports = {
    createBlog,
    getAllBlogs,
    getBlog,
    updateBlog,
    deleteBlog
};