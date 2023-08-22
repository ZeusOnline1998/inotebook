import NoteContext from './noteContext';
import React, { useState } from 'react';


const NoteState = (props) => {
    const host = "http://localhost:3001"
    const notesInitial = []
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMzUyYWFkNzViMGFiMTVhMDI0MDM5In0sImlhdCI6MTY5MjcwMjMwNn0.IC1CbTMHgmFc46MHyzwwX8Tgi7TJ4fbmBmwu0ufHjNY'

    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "auth-token": token
            }
        });
        // setNotes(response.json());
        const json = await response.json();
        // console.log(json);
        setNotes(json);
    }


    // Add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(title, description, tag)
        });
        // const json = await response.json();
        // setNotes(notes.concat(json));
        getNotes();
    }

    // Edit note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(title, description, tag)
        });

        const json = response.json();

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id == id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }

    // Delete note
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                "auth-token": token
            },
        });
        const json = await response.json();
        console.log(json);
        console.log(`Deleting note with id: ${id}`)
        // const newNotes = notes.filter((note) => note._id !== id)
        // setNotes(newNotes)
        getNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, editNote, deleteNote }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;