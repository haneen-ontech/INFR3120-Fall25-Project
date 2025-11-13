let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');
let Book = require('../models/book');

// get method -> extract and read something
// post method --> post something
// put method --> edit or update something
// delete method --> delete something
// CRUD --> Create, Read, Update, Delete 

// Get route for the read book list -- Read Operation
router.get('/', async(req, res, next)=>{
    try{
        const BookList = await Book.find();
        //console.log(BookList);
        res.render('Books/list', {
            title: 'Books',
            BookList:BookList,
            }
        )
    }
    catch(err){
        console.error(err);
        res.render('Books/list',{
            error:'Error on server'
        })
    }
})

// Get route for displaying the add page - Create Operation
router.get('/add', async(req, res, next)=>{
    try{
        res.render('Books/add',{
            title: 'Add a Book'
        })

    }
    catch(err){
        console.error(err);
        res.render('Books/list',{
            error:'Error on server'
        })
    }
})
// Post route for processing the add page - Create Operation
router.post('/add', async(req, res, next)=>{
    try{
        let newBook = Book({
            'name': req.body.name,
            'author': req.body.author,
            'description': req.body.description,
            'price': req.body.price,
        });
        Book.create(newBook).then(()=>{
            res.redirect('/books')
        }
        )
    }

    catch(err){
        console.error(err);
        res.render('Books/add',{
            error:'Error on server'
        })
    }
})


// Get route for displaying the edit page - Update Operation
router.get('/edit/:id', async(req, res, next)=>{
    try{
        const id = req.params.id;
        const bookToEdit = await Book.findById(id);
        res.render("Books/edit",
            {
                title: 'Edit Book',
                Book: bookToEdit
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
        let updateBook = Book({
            "_id": id,
            "name": req.body.name,
            "author": req.body.author,
            "published": req.body.published,
            "description": req.body.description,
            "price": req.body.price,
        })
        Book.findByIdAndUpdate(id, updateBook).then(()=>{
            res.redirect("/books")
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
        Book.deleteOne({_id:id}).then(()=>{
            res.redirect("/books")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})

module.exports = router;