import NoteContext from './noteContext';
import React, { useState } from 'react';


const NoteState = (props) => {
    const host = "http://localhost:3001"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMzUyYWFkNzViMGFiMTVhMDI0MDM5In0sImlhdCI6MTY5MjcwMjMwNn0.IC1CbTMHgmFc46MHyzwwX8Tgi7TJ4fbmBmwu0ufHjNY'
            }
        });
        // setNotes(response.json());
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }


    // Add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMzUyYWFkNzViMGFiMTVhMDI0MDM5In0sImlhdCI6MTY5MjcwMjMwNn0.IC1CbTMHgmFc46MHyzwwX8Tgi7TJ4fbmBmwu0ufHjNY'
            },
            body: JSON.stringify({title, description, tag})
        });

        const note = {
            "_id": "64e447b4390526ec27cfc40d",
            "user": "64e352aad75b0ab15a024039",
            "title": "My Title 2",
            "description": "Description 2",
            "tag": "personal",
            "date": "2023-08-22T05:29:24.832Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    // Edit note
    const editNote = async (id, title, description , tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMzUyYWFkNzViMGFiMTVhMDI0MDM5In0sImlhdCI6MTY5MjcwMjMwNn0.IC1CbTMHgmFc46MHyzwwX8Tgi7TJ4fbmBmwu0ufHjNY'
            },
            body: JSON.stringify(title, description, tag)
        });

        const json = response.json();

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id == id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
            
        }
    }
    
    // Delete note
    const deleteNote = (id) => {
        console.log(`Deleting note with id: ${id}`)
        const newNotes = notes.filter((note) =>  note._id !== id)
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes, addNote, editNote, deleteNote}} >
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;