import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from 'axios'
import { sub } from "date-fns";
import { v4 } from "uuid"
import { deleteNoteLocal } from "../utils/util";


const NOTES_URL = `${import.meta.env.VITE_SERVER_URL}/notes`;

const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = notesAdapter.getInitialState({
    status: 'idle',
    error: null
})



export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/notes`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            withCredentials: true // Enable sending cookies
        });
        return res.data.notes
    } catch (error) {
        console.log(error, 'error from fetch notes thunk');
    }
})

export const addNewNote = createAsyncThunk('notes/addNewNote', async (body) => {
    try {
        const response = await axios.post(NOTES_URL, body, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
})
export const updateNote = createAsyncThunk('notes/updateNote', async (body) => {
    try {
        const response = await axios.patch(`${NOTES_URL + '/' + body.id}`, body.data, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {

    const response = await axios.delete(`${NOTES_URL}/${id}`, {
        withCredentials: true
    })
    if (response?.status === 200) return id;
    return `${response?.status}: ${response?.statusText}`;
})


const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setAllNotesGuest(state, action) {
            state.status = 'succeeded';
            notesAdapter.setAll(state, action.payload)
        },
        addNewNoteGuest(state, action) {
            let temp = action.payload
            temp.date = new Date().toISOString();
            notesAdapter.addOne(state, temp)
        },
        deleteNoteGuest(state, action) {
            deleteNoteLocal(action.payload)
            notesAdapter.removeOne(state, action.payload)
        },
        updateNoteGuest(state, action) {
            action.payload.date = new Date().toISOString();
            notesAdapter.upsertOne(state, action.payload)
        },
        setNotesStatus(state, action) {
            state.status = action.payload;
        },
        deleteAllNotesGuest(state, action) {
            notesAdapter.removeAll(state)
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotes.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            let min = 1;
            const loadedNotes = action.payload.map(note => {
                note.date = sub(new Date(), { minutes: min++ }).toISOString();
                return note
            })
            console.log(loadedNotes, 'from builder');
            notesAdapter.setAll(state, loadedNotes)
        }).addCase(fetchNotes.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }).addCase(addNewNote.fulfilled, (state, action) => {
            action.payload.date = new Date().toISOString();
            notesAdapter.addOne(state, action.payload)
        }).addCase(updateNote.fulfilled, (state, action) => {
            action.payload.date = new Date().toISOString();
            notesAdapter.upsertOne(state, action.payload)
        }).addCase(deleteNote.fulfilled, (state, action) => {
            if (!action.payload) {
                console.log('Delete could not complete')
                console.log(action.payload)
                return;
            }
            notesAdapter.removeOne(state, action.payload)
        })
    }
})

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNotesIds
} = notesAdapter.getSelectors(state => state.notes)


export function getNotes() {
    return useSelector(selectAllNotes)
}
export function getNoteById(id) {
    return useSelector(state => selectNoteById(state, id))
}
export function getError() {
    return useSelector(state => state.notes.error)
}
export function getStatus() {
    return useSelector(state => state.notes.status)
}

export const { addNewNoteGuest, deleteNoteGuest, setNotesStatus, updateNoteGuest, deleteAllNotesGuest, setAllNotesGuest } = notesSlice.actions


export default notesSlice.reducer