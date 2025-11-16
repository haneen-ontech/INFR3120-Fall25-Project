let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');
let Record = require('../models/record');

// get method -> extract and read something
// post method --> post something
// put method --> edit or update something
// delete method --> delete something
// CRUD --> Create, Read, Update, Delete 

// Get route for the read record list -- Read Operation
router.get('/', async(req, res, next)=>{
    try{
        const RecordList = await Record.find();
        console.log(RecordList);
        res.render('Records/list', {
            title: 'Records',
            RecordList:RecordList,
            }
        )
    }
    catch(err){
        console.error(err);
        res.render('Records/list',{
            error:'Error on server'
        })
    }
})

// Get route for displaying the add page - Create Operation
router.get('/add', async(req, res, next)=>{
    try{
        res.render('Records/add',{
            title: 'Add a Incident Report'
        })

    }
    catch(err){
        console.error(err);
        res.render('Records/list',{
            error:'Error on server'
        })
    }
})

// Post route for processing the add page - Create Operation
router.post('/add', async(req, res, next)=>{
    try{
        let newRecord = Record({
            'name': req.body.name,
            'insuranceNum': req.body.insuranceNum,
            'description': req.body.description,
            'date': req.body.date,
            'carModel': req.body.carModel,
            'licensePlate': req.body.licensePlate,
        });
        Record.create(newRecord).then(()=>{
            res.redirect('/records')
        }
        )
    }

    catch(err){
        console.error(err);
        res.render('Records/add',{
            error:'Error on server'
        })
    }
})

// Get route for displaying the edit page - Update Operation
router.get('/edit/:id', async(req, res, next)=>{
    try{
        const id = req.params.id;
        const recordToEdit = await Record.findById(id);
        console.log("Record date:", Record.date);
        res.render("Records/edit",
            {
                title: 'Edit Record',
                Record: recordToEdit
            }
        )
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})

// Post route for displaying the edit page - Update Operation
router.post('/edit/:id', async(req, res, next)=>{
    try{
        let id = req.params.id;
        let updateRecord = Record({
            "_id": id,
            "name": req.body.name,
            "insuranceNum": req.body.insuranceNum,
            "description": req.body.description,
            "date": req.body.date,
            "carModel": req.body.carModel,
            "licensePlate": req.body.licensePlate,
        })
        Record.findByIdAndUpdate(id, updateRecord).then(()=>{
            res.redirect("/records")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})

// Get route for performing delete operation - Delete Operation
router.get('/delete/:id', async(req, res, next)=>{
    try{
        let id = req.params.id;
        Record.deleteOne({_id:id}).then(()=>{
            res.redirect("/records")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})

module.exports = router;