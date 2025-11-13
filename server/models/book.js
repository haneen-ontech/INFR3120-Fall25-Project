let mongoose = require("mongoose");

// Create a model 

let bookModel = mongoose.Schema({
    name: String, 
    author: String, 
    published: Number, 
    description: String, 
    price: Number
    },
    {
        collection: "books"
    }
);

module.exports=mongoose.model("Book", bookModel);