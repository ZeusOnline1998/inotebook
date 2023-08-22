const express = require('express');
const router = express.Router()
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Fetch all notes of the logged in user using: GET using: POST "/api/notes/addnote". login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    let notes = await Notes.find({user: req.user.id});
    res.json(notes)
})

// Add a new note using: POST "/api/notes/addnote". login required
router.post('/addnote', fetchUser, [
    body('title', 'Title should have more than 3 characters').isLength({min: 3}),
    body('description', 'Description should have more than 5 characters').isLength({min: 5}),
], async(req, res) => {
    try {
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }

        const Note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await Note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})

// Add a new note using: POST "/api/notes/addnote". login required
router.put('/updatenote/:id', fetchUser, [
    body('title', 'Title should have more than 3 characters').isLength({ min: 3 }),
    body('description', 'Description should have more than 5 characters').isLength({ min: 5 }),
], fetchUser, async (req, res) => {

})

module.exports = router