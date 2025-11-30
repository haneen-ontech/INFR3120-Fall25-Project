// importing libraries
let express = require('express') // express framework
let router = express.Router(); // create a router instance 
let mongoose = require('mongoose'); // mongoose for mongodb
let Record = require('../models/record'); // record model

// authentication middleware 
function requireAuth(req, res, next)
{
    // if user is not authenticated, redirect back to login page
    if(!req.isAuthenticated())
    {
        // if not, return to login page
        return res.redirect('/login')
    }
    next(); // continue to next middleware or route
}

// get method -> extract and read something
// post method --> post something
// put method --> edit or update something
// delete method --> delete something
// CRUD --> Create, Read, Update, Delete 

// Get route for the read record list -- Read Operation
router.get('/', async(req, res, next)=>{
    try{
        const RecordList = await Record.find(); // fetch all records from db
        console.log(RecordList);

        // render 'Records/list' page with fetched records and user info
        res.render('Records/list', {
            title: 'Records',
            RecordList:RecordList,
            displayName: req.user?req.user.displayName:"",
            user: req.user
            
        });
    }
    catch(err){
        console.error(err);
        // if error occurs, still render the page but with an error message
        res.render('Records/list',{
            error:'Error on server',
            user: req.user
        })
    }
})

// Get route for displaying the add page - Create Operation
router.get('/add', async(req, res, next)=>{
    try{
        // render from page to add new record
        res.render('Records/add',{
            title: 'Add a Incident Report',
            displayName: req.user?req.user.displayName:"",
            user: req.user
        })

    }
    catch(err){
        console.error(err);
        // if error, redirect to list with error message
        res.render('Records/list',{
            error:'Error on server',
            user: req.user
        })
    }
})
// Post route for processing the add page - Create Operation
router.post('/add', async(req, res, next)=>{
    try{
        // create new record object from form data
        let newRecord = Record({
            'name': req.body.name,
            'insuranceNum': req.body.insuranceNum,
            'description': req.body.description,
            'date': req.body.date,
            'carModel': req.body.carModel,
            'licensePlate': req.body.licensePlate,
        });

        // save new record to db
        Record.create(newRecord).then(()=>{
            res.redirect('/records') // redirect to record list after saving
        }
        )
    }

    catch(err){
        console.error(err);
        // if error, re-render add page with error message
        res.render('Records/add',{
            error:'Error on server',
            user: req.user
        })
    }
})

// Get route for displaying the edit page - Update Operation
router.get('/edit/:id', async(req, res, next)=>{
    try{
        const id = req.params.id;
        const recordToEdit = await Record.findById(id); // fetch record by id
        console.log("Record date:", Record.date);

        // render edit page with record details
        res.render("Records/edit",
            {
                title: 'Edit Record',
                Record: recordToEdit,
                displayName: req.user?req.user.displayName:"",
                user: req.user
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
            "_id": id, // required for findByIdAndUpdate
            "name": req.body.name,
            "insuranceNum": req.body.insuranceNum,
            "description": req.body.description,
            "date": req.body.date,
            "carModel": req.body.carModel,
            "licensePlate": req.body.licensePlate,
        })

        // update record in db
        Record.findByIdAndUpdate(id, updateRecord).then(()=>{
            res.redirect("/records") // redirect to record list after update
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
        // delete record from db by id
        Record.deleteOne({_id:id}).then(()=>{
            res.redirect("/records"); // redirect after deletion
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})

// export router
module.exports = router;