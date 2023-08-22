const express = require('express');
const router = express.Router()
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Fetch all notes of the logged in user using: GET using: POST "/api/notes/addnote". login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    //Fetch all notes wrt to user
    let notes = await Notes.find({user: req.user.id});
    res.json(notes)
})

// Add a new note using: POST "/api/notes/addnote". login required
router.post('/addnote', fetchUser, [
    body('title', 'Title should have more than 3 characters').isLength({min: 3}),
    body('description', 'Description should have more than 5 characters').isLength({min: 5}),
], async(req, res) => {
    try {
        //Provide validation for incoming data
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }

        //Create note object using mongoose
        const Note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        //Save note and return the saved note
        const savedNote = await Note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})


// Update existing note using: PUT "/api/notes/updatenote/:id". login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const {title, description, tag} = req.body;
    //Create newNote object which stored updated data
    const newNote = {};
    if(title) {
        newNote.title = title
    }
    if(description) {
        newNote.description = description
    }
    if(tag) {
        newNote.tag = tag;
    }

    //Find note which has to be updated
    const note = await Notes.findById(req.params.id);
    if(!note) {
        res.status(404).send("Not Found")
    }
    //Allow updation only if user owns this note
    if(note.user.toString() !== req.user.id){
        res.status(401).send("Not Allowed")
    }
    
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json(updatedNote)

})



module.exports = router