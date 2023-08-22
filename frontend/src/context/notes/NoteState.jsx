import NoteContext from './noteContext';
import React, { useState } from 'react';


const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "64e43b21660b3dacb13c8403",
            "user": "64e352aad75b0ab15a024039",
            "title": "My Title",
            "description": "Description 1",
            "tag": "General",
            "date": "2023-08-22T04:35:45.749Z",
            "__v": 0
        },
        {
            "_id": "64e447b4390526ec27cfc40d",
            "user": "64e352aad75b0ab15a024039",
            "title": "My Title 2",
            "description": "Description 2",
            "tag": "personal",
            "date": "2023-08-22T05:29:24.832Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}} >
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;