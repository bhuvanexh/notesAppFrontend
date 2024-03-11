import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, redirect, useNavigate, useOutletContext } from "react-router-dom";
import { addNewNote, addNewNoteGuest, deleteNote, deleteNoteGuest, fetchNotes, getError, getNotes, getStatus, setAllNotesGuest, setNotesStatus } from "../../features/notesSlice";
import { v4 } from "uuid"
import Sidebar from "./Sidebar";
import { addNoteLocal, getNotesLocal } from "../../utils/util";
import Notelink from "./Notelink";

export default function NotesWrapper() {
    const status = getStatus()
    const error = getError()
    const notes = getNotes()

    const user = useOutletContext()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('effect ran');
        if (status == 'idle' && user.id) {
            dispatch(fetchNotes())
        } else if (localStorage.getItem('user') == 'guest') {
            let notesTemp = getNotesLocal()
            dispatch(setAllNotesGuest(notesTemp))
        }
    }, [status])


    function handleDelete(id) {
        if (user != 'guest') {
            dispatch(deleteNote(id))
        } else if (user == 'guest') {
            dispatch(deleteNoteGuest(id))
        }
        console.log('delete and navigate');
        redirect('/notes')
        return navigate('/notes')
    }

    const renderEl = notes.map(n => (
        <Notelink key={n.id} n={n} handleDelete={handleDelete} />
    ))

    async function addNote() {
        if (user != 'guest') {
            let { payload } = await dispatch(addNewNote({
                title: '*Add Title*',
                content: ''
            }))
            navigate(`/notes/${payload.id}`)
        } else if (user == 'guest') {
            let tempId = v4()
            addNoteLocal({
                title: '*Add Title*',
                content: '',
                id: tempId
            })
            dispatch(addNewNoteGuest({
                title: '*Add Title*',
                content: '',
                id: tempId
            }))
            navigate(`/notes/${tempId}`)
        }
    }


    if (status == 'loading' || status == 'idle') {
        return (<>Loading...</>)
    }
    if (status == 'failed') {
        return (<>{error}</>)
    }


    return (
        <>
            <Sidebar notes={renderEl} addNote={addNote}>
                <Outlet context={user} />
            </Sidebar>
        </>
    )
}