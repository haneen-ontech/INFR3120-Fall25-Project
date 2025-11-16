let mongoose = require("mongoose");

// Creating a model that matches our mongodb database requirements

let recordModel = mongoose.Schema({
    name: String, 
    insuranceNum: Number, 
    description: String, 
    date: Date, //requires Date type to allow users to interact with calendar efficiently
    carModel: String,
    licensePlate: String,
    },
    {
        collection: "records"
    }
);

module.exports=mongoose.model("Record", recordModel); // Turns schema into a model that allows us to perform crud operations on it