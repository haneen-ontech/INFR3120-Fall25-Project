let mongoose = require("mongoose");

// Create a model 

let recordModel = mongoose.Schema({
    name: String, 
    insuranceNum: Number, 
    description: String, 
    date: String, 
    carModel: String,
    licensePlate: String,
    },
    {
        collection: "records"
    }
);

module.exports=mongoose.model("Record", recordModel);